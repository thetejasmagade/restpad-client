import Image from "next/image";

export default function FullPageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/full-page-loader.svg" height="80" width="80" alt="full-page-loader" priority={true} />
    </div>
  );
}
