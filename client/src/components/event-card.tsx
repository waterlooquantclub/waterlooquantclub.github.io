import { Text } from "./text";

interface EventCardProps {
  eventName: string;
  dateTime?: string;
  location?: string;
  description?: string;
  imageUrl: string;
  linkText?: string;
  linkHref?: string;
}

function EventCard({
  eventName,
  dateTime,
  location,
  description,
  imageUrl,
  linkText,
  linkHref,
}: EventCardProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-gradient-to-b from-[#171B1Fcc] to-[#392940cc] rounded-xl overflow-hidden max-w-sm sm:max-w-4xl w-[85vw] border border-[#818181] hover:shadow-[0_0_8px_4px_#EECFEF] transition-shadow duration-200 ease-out z-[50]">
      <div className="relative h-48 sm:w-64 sm:h-64 sm:m-6 sm:rounded-full sm:flex-shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 sm:pl-0 flex flex-col sm:justify-center flex-1 items-center sm:items-start">
        <Text size="xl" className="font-semibold mb-2 sm:mb-3 sm:text-2xl">
          {eventName}
        </Text>
        {dateTime && location && (
          <Text className="font-medium mb-3 sm:mb-4">
            {dateTime} | {location}
          </Text>
        )}
        {description && (
          <Text
            size="sm"
            className="mb-6 flex-1 sm:flex-none leading-relaxed text-left"
          >
            {description}
          </Text>
        )}
        {linkHref && linkText && (
          <a
            href={linkHref}
            target="_blank"
            className="flex items-center cursor-pointer group"
          >
            <Text className="font-medium group-hover:text-[#BB68C5]">
              {linkText}
            </Text>
            <span className="ml-2 transform group-hover:translate-x-1 group-hover:text-[#BB68C5] transition-transform duration-200">
              &rsaquo;
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

export default EventCard;
