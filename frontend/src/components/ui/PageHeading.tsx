import type { ReactNode } from 'react';
import FeatureHeading, { FeatureVariant } from '../features/FeatureHeading';

export function PageHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  const variants: Record<string, FeatureVariant> = {
    'THE LIVING ENCYCLOPEDIA': 'species',
    'A DIFFERENT PERSPECTIVE': 'gallery',
    'LOOK CLOSER': 'compare',
    'BEYOND FIRST IMPRESSIONS': 'similar',
    'A PLACE IN THE WILD': 'habitats',
    'CURIOSITY WITH CARE': 'safety',
  };

  return variants[label] ? (
    <FeatureHeading
      variant={variants[label]}
      label={label}
      title={title}
      text={text}
    />
  ) : (
    <div className="page-heading">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Empty({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="empty-state">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default PageHeading;
