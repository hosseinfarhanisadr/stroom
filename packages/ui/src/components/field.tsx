import { Field as FieldPrimitives } from "@base-ui-components/react/field";
import type { ComponentProps } from "react";
import { cn } from "@stroom/ui/lib/utils";

type FieldPrimitivesRootProps = ComponentProps<typeof FieldPrimitives.Root>;
type FieldPrimitivesLabelProps = ComponentProps<typeof FieldPrimitives.Label>;
type FieldPrimitivesControlProps = ComponentProps<
  typeof FieldPrimitives.Control
>;
type FieldPrimitivesDescriptionProps = ComponentProps<
  typeof FieldPrimitives.Description
>;
type FieldPrimitivesErrorProps = ComponentProps<typeof FieldPrimitives.Error>;
type FieldPrimitivesValidityProps = ComponentProps<
  typeof FieldPrimitives.Validity
>;

function FieldRoot(props: FieldPrimitivesRootProps) {
  return <FieldPrimitives.Root {...props} />;
}

function FieldLabel({ className, ...props }: FieldPrimitivesLabelProps) {
  return (
    <FieldPrimitives.Label
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  );
}

function FieldControl({ className, ...props }: FieldPrimitivesControlProps) {
  return (
    <FieldPrimitives.Control
      {...props}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[focused]:bg-red-400",
        className,
      )}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitivesDescriptionProps) {
  return (
    <FieldPrimitives.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldPrimitivesErrorProps) {
  return (
    <FieldPrimitives.Error
      className={cn("text-destructive text-sm", className)}
      {...props}
    />
  );
}

function FieldValidity(props: FieldPrimitivesValidityProps) {
  return <FieldPrimitives.Validity {...props} />;
}

export {
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldValidity,
};
