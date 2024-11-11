interface TextCardProps {
  title: string;
  description: string;
  subTitle?: string;
  icon?: string;
}
function TextCard({
  title,
  description,
  icon = "",
  subTitle = "",
}: TextCardProps) {
  return (
    <div className="rounded-box ring-primary/20 to-primary/10 from-base-100/10 w-full gap-6 bg-gradient-to-br p-6 text-start ring-1 sm:flex">
      <div className="flex flex-col gap-1.5 sm:w-7/12 md:w-full ">
        <p className="text-primary text-lg font-semibold  flex items-center">
          {icon && <span className={`${icon} size-8 mr-2`} />}
          {subTitle}
        </p>
        <h1 className="text-base-content/90 text-4xl font-bold capitalize leading-tight">
          {title}
        </h1>
        <p className="text-base-content/80 mt-2 text-base font-normal">
          {description}
        </p>
      </div>
      {/* <div className="flex grow items-center justify-center max-sm:mt-5 max-sm:justify-start ">
        <span className={`size-10 ${icon}`}></span>
      </div> */}
    </div>
  );
}

export default TextCard;
