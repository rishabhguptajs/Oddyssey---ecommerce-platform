"use client";

// src/use-aria-popover.ts
import { useEffect } from "react";
import {
  useOverlay,
  useOverlayPosition
} from "@react-aria/overlays";
import { ariaHideOutside, toReactAriaPlacement } from "@nextui-org/aria-utils";
import { mergeProps } from "@react-aria/utils";
function useReactAriaPopover(props, state) {
  const {
    triggerRef,
    popoverRef,
    showArrow,
    offset = 7,
    crossOffset = 0,
    scrollRef,
    shouldFlip,
    boundaryElement,
    shouldCloseOnBlur = true,
    placement: placementProp = "top",
    containerPadding,
    shouldCloseOnInteractOutside,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    ...otherProps
  } = props;
  const isNonModal = isNonModalProp || true;
  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable: true,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside ? shouldCloseOnInteractOutside : (element) => {
        let trigger = triggerRef == null ? void 0 : triggerRef.current;
        return !trigger || !trigger.contains(element);
      }
    },
    popoverRef
  );
  const {
    overlayProps: positionProps,
    arrowProps,
    placement
  } = useOverlayPosition({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: () => {
    }
  });
  useEffect(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);
  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement
  };
}

export {
  useReactAriaPopover
};
