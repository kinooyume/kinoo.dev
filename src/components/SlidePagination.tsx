type slideEvent = (
  index: number,
  firstVisible: number,
  lastVisible: number,
) => void;

type Props = {
  setSlideEvent: (slideEvent: slideEvent) => void;
};

export const SlidePagination = (_props: Props) => {
  return <div class="pagination-wrapper" />;
};
