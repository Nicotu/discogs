import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

type CardProps = {
  data: {
    title: string;
    cover_image: string;
    artist?: string;
    label?: string;
    year?: string;
  };
  as?: "li" | "div";
  ctaText?: string;
  link?: string;
};

const styles = {
  container: "inline-flex bg-slate-100 rounded-lg",
  imageContainer: "p-4 bg-slate-200 rounded-tl-lg rounded-bl-lg",
  image:
    "relative flex w-[100px] h-[100px] rounder-inherit object-cover object-top",
  textContainer: "ml-4 flex flex-col py-4",
  artistText: "text-sm text-gray-500",
  titleText: "text-xl",
  labelText: "text-xs text-gray-500 mt-top",
  anchor: "text-blue-500 underline",
};

export const Card: FC<CardProps> = ({ data, as = "li", ctaText, link }) => {
  const { title, cover_image, artist, label, year } = data;

  const {
    container,
    imageContainer,
    image,
    textContainer,
    artistText,
    titleText,
    labelText,
    anchor,
  } = styles;

  const Component = as;

  return (
    <Component className={container}>
      <div className={imageContainer}>
        <div className={image}>
          <Image
            src={cover_image.length > 0 ? cover_image : "/vinyl.svg"}
            alt={title}
            width="100"
            height="100"
            className={image}
          />
        </div>
      </div>
      <div className={textContainer}>
        {artist && (
          <p className={artistText}>
            {artist} - {year}
          </p>
        )}
        {title && <h2 className={titleText}>{title}</h2>}
        {label && <h4 className={labelText}>{label}</h4>}
        {ctaText && link && (
          <Link className={anchor} href={link}>
            {ctaText}
          </Link>
        )}
      </div>
    </Component>
  );
};
