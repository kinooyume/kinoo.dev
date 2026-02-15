import { createSignal, For, onCleanup, onMount, type Accessor } from "solid-js";
import BlazeSlider from "blaze-slider/blaze-slider/src/index.ts";
import "blaze-slider/blaze-slider/src/blaze.css";
import "./Slider.css";

type PaginationProps = {
  pictures: string[];
  index: Accessor<number>;
  moveTo: (index: number) => void;
};

const SliderPagination = (props: Readonly<PaginationProps>) => {
  return (
    <div class="pagination-wrapper">
      <div class="pagination" aria-hidden="true">
        <ul class="list">
          <For each={props.pictures}>
            {(_, index) => (
              <li classList={{ active: index() === props.index() }}>
                <button onClick={() => props.moveTo(index())} tabIndex={-1} />
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

type SliderProps = {
  pictures: string[];
  children: HTMLElement;
};

const Slider = (props: Readonly<SliderProps>) => {
  let sliderEl: HTMLDivElement | undefined;
  let unsubscribe: () => void;
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [slider, setSlider] = createSignal<BlazeSlider>();

  const moveTo = (idx: number) => {
    const s = slider();
    if (!s) return;
    const currentIndex = s.stateIndex;
    const diff = Math.abs(currentIndex - idx);
    if (currentIndex < idx) {
      s.next(diff);
    } else {
      s.prev(diff);
    }
  };

  onMount(() => {
    if (!sliderEl) return;
    const slider = new BlazeSlider(sliderEl);

    setSlider(slider);
    unsubscribe = slider.onSlide((pageIndex, _fIndex, _lIndex) => {
      setCurrentIndex(pageIndex);
    });
  });

  onCleanup(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return (
    <div ref={(el) => (sliderEl = el)}>
      <div class="blaze-container">
        <div class="blaze-track-container">
          <div class="blaze-track">
            <For each={props.pictures}>
              {(picture) => (
                <div>
                  <img src={`/images/${picture}`} alt={picture} />
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="blaze-navigation">
          <button class="blaze-prev">{props.children}</button>
          <SliderPagination
            pictures={props.pictures}
            index={currentIndex}
            moveTo={moveTo}
          />
          <button class="blaze-next">{props.children}</button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
