import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { SlideData } from "@/types/presentation";

/**
 * Clean string for safe filesystem naming
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/**
 * Ensures all <img> elements inside the container are loaded and fully decoded
 */
async function waitForImagesToLoad(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll("img"));
  if (images.length === 0) return;

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        const onComplete = () => {
          img.removeEventListener("load", onComplete);
          img.removeEventListener("error", onComplete);
          resolve();
        };
        img.addEventListener("load", onComplete);
        img.addEventListener("error", onComplete);
        // Fallback timeout in 1200ms to prevent hanging
        setTimeout(onComplete, 1200);
      });
    })
  );
}

/**
 * Prepares the DOM element and waits for animations/images to settle before capture
 */
async function prepareElementForCapture(element: HTMLElement): Promise<void> {
  await waitForImagesToLoad(element);
  // Settle time for Framer Motion opacity/scale transitions
  await new Promise((resolve) => setTimeout(resolve, 250));
}

/**
 * Capture an HTML element using html-to-image (SVG foreignObject) and draw it centered onto a jsPDF page
 */
async function addElementToPdfPage(
  pdf: jsPDF,
  element: HTMLElement,
  isFirstPage: boolean
): Promise<void> {
  await prepareElementForCapture(element);

  // Generate high-resolution PNG using native browser foreignObject renderer
  const dataUrl = await htmlToImage.toPng(element, {
    quality: 0.98,
    pixelRatio: 2, // 2x high resolution
    backgroundColor: "#F8FAFC", // slate-50
    cacheBust: false,
    filter: (node) => {
      if (node instanceof HTMLElement) {
        return (
          !node.hasAttribute("data-dev-ignore") &&
          !node.classList.contains("dev-tools-ignore")
        );
      }
      return true;
    },
  });

  if (!isFirstPage) {
    pdf.addPage("a4", "landscape");
  }

  // Load image to extract natural aspect ratio
  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve) => {
    if (img.complete) resolve();
    else img.onload = () => resolve();
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm

  // Compute fitting dimensions while preserving aspect ratio
  const imgAspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height);
  let renderWidth = pdfWidth;
  let renderHeight = pdfWidth / imgAspect;
  let posX = 0;
  let posY = (pdfHeight - renderHeight) / 2;

  if (renderHeight > pdfHeight) {
    renderHeight = pdfHeight;
    renderWidth = pdfHeight * imgAspect;
    posX = (pdfWidth - renderWidth) / 2;
    posY = 0;
  }

  // Draw background fill
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

  // Draw slide image
  pdf.addImage(
    dataUrl,
    "PNG",
    posX,
    posY,
    renderWidth,
    renderHeight,
    undefined,
    "FAST"
  );
}

/**
 * Export a single active slide to PDF and trigger file download
 */
export async function exportCurrentSlidePdf(
  element: HTMLElement,
  slide: SlideData,
  slideIndex: number
): Promise<void> {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  await addElementToPdfPage(pdf, element, true);

  const slug = slugify(slide.title || `slide-${slideIndex + 1}`);
  const filename = `slide-${slideIndex + 1}-${slug}.pdf`;
  pdf.save(filename);
}

/**
 * Export all slides in the deck to a single multi-page PDF document
 */
export async function exportAllDeckSlidesPdf({
  slides,
  currentIndex,
  onGoToSlide,
  getSlideElement,
  onProgress,
}: {
  slides: SlideData[];
  currentIndex: number;
  onGoToSlide: (index: number) => void;
  getSlideElement: () => HTMLElement | null;
  onProgress?: (current: number, total: number, stage: string) => void;
}): Promise<void> {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const total = slides.length;
  const originalIndex = currentIndex;

  try {
    for (let i = 0; i < total; i++) {
      if (onProgress) {
        onProgress(i + 1, total, `Capturing slide ${i + 1} of ${total}...`);
      }

      // Navigate to the target slide
      onGoToSlide(i);

      // Wait 600ms for Framer Motion entrance animation (350ms) and images to settle
      await new Promise((resolve) => setTimeout(resolve, 600));

      const slideElement = getSlideElement();
      if (!slideElement) {
        throw new Error(`Could not find slide container element for slide ${i + 1}`);
      }

      await addElementToPdfPage(pdf, slideElement, i === 0);
    }

    if (onProgress) {
      onProgress(total, total, "Compiling PDF document...");
    }

    const filename = `noaa-fisheries-presentation-all-slides.pdf`;
    pdf.save(filename);
  } finally {
    // Restore user back to their original slide
    onGoToSlide(originalIndex);
  }
}
