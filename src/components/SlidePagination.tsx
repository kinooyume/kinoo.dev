type slideEvent = (
  index: number,
  firstVisible: number,
  lastVisible: number,
) => void;

type Props = {
  setSlideEvent: (slideEvent: slideEvent) => void;
};

const SlidePagination = (props: Props) => {
  return <div class="pagination-wrapper" />;
};
