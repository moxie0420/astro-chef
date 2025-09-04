const container = document.querySelector('.carousel') as HTMLDivElement;
const track = document.querySelector(".list") as HTMLDivElement;

const cards = Array.from(track.children) as Array<HTMLElement>;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
let cardWidth = cards[0].offsetWidth;
let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) * 2;

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number): (...args: Parameters<F>) => void {
    let timeoutId: number | undefined | ReturnType<typeof setTimeout>;

    return function(...args: Parameters<F>): void {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => func(...args), waitFor);
    };
}

const init = () => {
  cardWidth = cards[0].offsetWidth;
  cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) * 2;

  const initialOffset = container.offsetWidth / 2 - cardWidth / 2;
  track.style.transform = `translateX(${initialOffset}px)`;
  updateCarousel();
}

const updateCarousel = () => {
  cards.forEach((card, index) => {
    card.classList.remove(
			"is-active",
			"is-prev",
			"is-next",
			"is-far-prev",
			"is-far-next"
		);

		if (index === currentIndex) {
			card.classList.add("is-active");
		} else if (index === currentIndex - 1) {
			card.classList.add("is-prev");
		} else if (index === currentIndex + 1) {
			card.classList.add("is-next");
		} else if (index < currentIndex - 1) {
			card.classList.add("is-far-prev");
		} else if (index > currentIndex + 1) {
			card.classList.add("is-far-next");
		}
  })

  indicators.forEach((indicator, index) => {
		indicator.classList.toggle("active", index === currentIndex);
	});
}

const moveToSlide = (targetIndex: number) => {
  if (targetIndex < 0 || targetIndex >= cards.length) return;

  const amountToMove = targetIndex *(cardWidth + cardMargin);
  const containerCenter = container.offsetWidth / 2;
  const cardCenter = cardWidth / 2;
  const targetTranslateX = containerCenter - cardCenter - amountToMove;

  track.style.transform = `translateX(${targetTranslateX - 25}px)`;
  currentIndex = targetIndex;
  updateCarousel();
}

nextButton?.addEventListener("click", () => {
  const nextIndex = currentIndex + 1;
  if (nextIndex < cards.length) moveToSlide(nextIndex);
})

prevButton?.addEventListener("click", () => {
  const prevIndex = currentIndex - 1;
  if (prevIndex >= 0) moveToSlide(prevIndex);
})

indicators.forEach((indicator, index) => {
	indicator.addEventListener("click", () => {
		moveToSlide(index);
	});
});

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

track.addEventListener("mousedown", dragStart);
track.addEventListener("touchstart", dragStart, { passive: true });

track.addEventListener("mousemove", drag);
track.addEventListener("touchmove", drag, { passive: true });

track.addEventListener("mouseup", dragEnd);
track.addEventListener("mouseleave", dragEnd);
track.addEventListener("touchend", dragEnd);

function dragStart(event) {
	isDragging = true;
	startPos = getPositionX(event);

	// Get current transform value
	const transformMatrix = window
		.getComputedStyle(track)
		.getPropertyValue("transform");
	if (transformMatrix !== "none") {
		currentTranslate = parseInt(transformMatrix.split(",")[4]);
	} else {
		currentTranslate = 0;
	}
	prevTranslate = currentTranslate;
	track.style.transition = "none";
	animationID = requestAnimationFrame(animation);
	track.style.cursor = "grabbing";
}

function drag(event) {
	if (isDragging) {
		const currentPosition = getPositionX(event);
		const moveX = currentPosition - startPos;
		currentTranslate = prevTranslate + moveX;
	}
}

function animation() {
	if (!isDragging) return;
	track.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
	if (!isDragging) return;

	isDragging = false;
	const movedBy = currentTranslate - prevTranslate;
	track.style.transition = "transform 0.75s cubic-bezier(0.21, 0.61, 0.35, 1)";
	track.style.cursor = "grab";

	// Determine whether to snap to next/prev slide
	const threshold = cardWidth / 3.5; // Less distance needed to trigger slide change

	if (movedBy < -threshold && currentIndex < cards.length - 1) {
		moveToSlide(currentIndex + 1);
	} else if (movedBy > threshold && currentIndex > 0) {
		moveToSlide(currentIndex - 1);
	} else {
		moveToSlide(currentIndex); // Snap back
	}
}

function getPositionX(event: Event) {
	return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight" || e.key === "ArrowDown") {
		if (currentIndex < cards.length - 1) {
			moveToSlide(currentIndex + 1);
		}
	} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
		if (currentIndex > 0) {
			moveToSlide(currentIndex - 1);
		}
	}
});

window.addEventListener(
	"resize",
	debounce(() => {
		init();
		moveToSlide(currentIndex);
	}, 250)
);

window.onload = () => {
  init();

}
