import Image from "next/image";

interface PageBannerProps {
  title: string;
  image: string;
}

export default function PageBanner({ title, image }: PageBannerProps) {
  return (
    <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden flex items-end">
      <Image
        src={image}
        alt={title}
        fill
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        sizes="100vw"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 pb-10 w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.18em] uppercase text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}
