import { createSignal, For, onCleanup, onMount, type Accessor } from "solid-js";
import BlazeSlider from "blaze-slider/blaze-slider/src/index.ts";
import "blaze-slider/blaze-slider/src/blaze.css";
import "./Slider.css";

type PaginationProps = {
  pictures: string[];
  index: Accessor<number>;
  moveTo: (index: number) => void;
};

const SliderPagination = (props: PaginationProps) => {
  return (
    <div class="pagination-wrapper">
      <div class="pagination" aria-hidden="true">
        <ul class="list">
          <For each={props.pictures}>
            {(_, index) => (
              <li
                classList={{ active: index() === props.index() }}
                onClick={() => props.moveTo(index())}
                onKeyPress={(e) => e.key === 'Enter' && props.moveTo(index())}
                role="button"
                tabIndex={0}
               />
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

const Slider = (props: SliderProps) => {
  let sliderEl: HTMLDivElement;
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
    <div ref={sliderEl as HTMLDivElement}>
      <div class="blaze-container">
        <div class="blaze-track-container">
          <div class="blaze-track">
            <For each={props.pictures}>
              {(picture) => (
                <div>
                  <img src={`images/${picture}`} alt={picture} />
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
