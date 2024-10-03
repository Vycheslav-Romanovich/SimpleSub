import { animate } from 'framer-motion';
import scrollIntoView from 'scroll-into-view-if-needed';

type ScrollToElementType = {
  element: Element;
  boundary: Element;
  scrollMode?: ScrollMode;
  block?: ScrollLogicalPosition;
};

export const scrollToElement = ({
  element,
  boundary,
  scrollMode = 'always',
  block = 'start',
}: ScrollToElementType) => {
  scrollIntoView(element, {
    scrollMode,
    block,
    boundary,
    behavior: actions => {
      actions.forEach(({ el, top, left }) => {
        animate(el.scrollTop, top, {
          duration: 0.4,
          onUpdate: v => (el.scrollTop = v),
        });
        animate(el.scrollLeft, left, {
          duration: 0.4,
          onUpdate: v => (el.scrollLeft = v),
        });
      });
    },
  });
};

type ScrollMode = 'always' | 'if-needed';
type ScrollLogicalPosition = 'center' | 'end' | 'nearest' | 'start';
