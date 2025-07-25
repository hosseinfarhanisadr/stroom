import { Field as FieldPrimitives } from "@base-ui-components/react/field";
import type { ComponentProps } from "react";
import { cn } from "@stroom/ui/lib/utils";

type FieldPrimitivesRootProps = ComponentProps<typeof FieldPrimitives.Root>;
type FieldPrimitivesLabelProps = ComponentProps<typeof FieldPrimitives.Label>;
type FieldPrimitivesDescriptionProps = ComponentProps<
  typeof FieldPrimitives.Description
>;
type FieldPrimitivesErrorProps = ComponentProps<typeof FieldPrimitives.Error>;

function Field({ className, ...props }: FieldPrimitivesRootProps) {
  return (
    <FieldPrimitives.Root className={cn("grid gap-2", className)} {...props} />
  );
}

function Label({ className, ...props }: FieldPrimitivesLabelProps) {
  return (
    <FieldPrimitives.Label
      className={cn(
        "data-[invalid]:text-red-400",
        "flex select-none items-center gap-2 text-sm font-medium leading-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

const Control = FieldPrimitives.Control;

function Description({ className, ...props }: FieldPrimitivesDescriptionProps) {
  return (
    <FieldPrimitives.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function Error({ className, ...props }: FieldPrimitivesErrorProps) {
  return (
    <FieldPrimitives.Error
      className={cn("text-destructive text-sm", className)}
      {...props}
    />
  );
}

const Validity = FieldPrimitives.Validity;

export { Field, Label, Control, Description, Error, Validity };
