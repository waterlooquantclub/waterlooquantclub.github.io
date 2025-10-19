import { Text } from "./text";

interface EventCardProps {
  eventName: string;
  dateTime?: string;
  location?: string;
  description?: string;
  imageUrl: string;
  links?: { text: string; href: string }[];
}

function EventCard({
  eventName,
  dateTime,
  location,
  description,
  imageUrl,
  links,
}: EventCardProps) {
  return (
    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden max-w-sm sm:max-w-4xl w-[85vw] hover:shadow-[0_0_8px_4px_#EECFEF] transition-shadow duration-200 ease-out z-[50]">
  <div className="relative flex-shrink-0 h-32 w-32 mx-auto mt-6 rounded-full overflow-hidden sm:h-64 sm:w-64 sm:m-6 sm:flex-shrink-0">
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 sm:pl-0 flex flex-col sm:justify-center flex-1 items-center sm:items-start">
        <Text size="xl" className="font-semibold mb-2 sm:mb-3 text-lg sm:text-2xl text-center sm:text-left">
          {eventName}
        </Text>
        {dateTime && location && (
          <Text className="font-medium mb-3 sm:mb-4 text-sm sm:text-base text-center sm:text-left">
            {dateTime} | {location}
          </Text>
        )}
        {description && (
          <Text
            size="sm"
            className="mb-6 flex-1 sm:flex-none leading-relaxed text-xs sm:text-sm text-center sm:text-left"
          >
            {description}
          </Text>
        )}
        {links && links.length > 0 && (
          <div className="space-y-2">
            {links.map(({ text, href }, i) => (
              <a
                href={href}
                target="_blank"
                className="flex items-center cursor-pointer group"
                key={i}
              >
                <Text className="font-medium group-hover:text-[#BB68C5] text-sm sm:text-base">
                  {text}
                </Text>
                <span className="ml-2 transform group-hover:translate-x-1 group-hover:text-[#BB68C5] transition-transform duration-200">
                  &rsaquo;
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;
