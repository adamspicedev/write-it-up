import Image from "next/image";

const Logos = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src="/logos/kinde.svg"
          alt="Logo"
          width={800}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
        />
        <Image
          src="/logos/nextjs.svg"
          alt="Logo"
          width={800}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
        />
        <Image
          src="/logos/kinde.svg"
          alt="Logo"
          width={800}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
        />
        <Image
          src="/logos/nextjs.svg"
          alt="Logo"
          width={800}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
        />
        <Image
          src="/logos/kinde.svg"
          alt="Logo"
          width={800}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
        />
      </div>
    </div>
  );
};

export default Logos;
