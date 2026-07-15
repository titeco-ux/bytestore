/* ByteNana UI — public entry. Atomic design; more atoms/molecules land here. */

// Utilities
export { cn } from './lib/cn';

/* --------------------------------------------------------------------- Atoms */
export {
  Heading,
  Text,
  Eyebrow,
  SectionLabel,
  Highlight,
  textVariants,
  type HeadingProps,
  type TextProps,
} from './atoms/typography';
export { Badge, badgeVariants, type BadgeProps } from './atoms/badge';
export { Button, buttonVariants, type ButtonProps } from './atoms/button';
export { Icon, type IconProps } from './atoms/icon';
export { Input, type InputProps } from './atoms/input';
export { Textarea, type TextareaProps } from './atoms/textarea';
export { Label, type LabelProps } from './atoms/label';
export { Separator, type SeparatorProps } from './atoms/separator';
export { Container, type ContainerProps } from './atoms/container';
export { Section, sectionVariants, type SectionProps } from './atoms/section';

/* ----------------------------------------------------------------- Molecules */
export {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
} from './molecules/card';
export { FormField, type FormFieldProps } from './molecules/form-field';

/* --------------------------------------------------------------- Backgrounds */
export { DottedMesh, type DottedMeshProps } from './backgrounds/dotted-mesh';
