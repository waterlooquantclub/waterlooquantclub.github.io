import { Text } from "./text";

interface EventCardProps {
  eventName: string;
  dateTime: string;
  location: string;
  description: string;
  imageUrl: string;
  onSignUp?: () => void;
}

function EventCard({
  eventName,
  dateTime,
  location,
  description,
  imageUrl,
  onSignUp,
}: EventCardProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-[#171B1F] rounded-xl overflow-hidden max-w-sm sm:max-w-4xl w-[90%] shadow-[0_0_4px_2px_#EECFEF] hover:shadow-[0_0_8px_4px_#EECFEF] transition-shadow duration-200 ease-out">
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
        <Text className="font-medium mb-3 sm:mb-4">
          {dateTime} | {location}
        </Text>
        <Text
          size="sm"
          className="mb-6 flex-1 sm:flex-none leading-relaxed text-left"
        >
          {description}
        </Text>
        <button
          onClick={onSignUp}
          className="flex items-center cursor-pointer group"
        >
          <Text className="font-medium group-hover:text-[#BB68C5]">
            Sign up
          </Text>
          <span className="ml-2 transform group-hover:translate-x-1 group-hover:text-[#BB68C5] transition-transform duration-200">
            &rsaquo;
          </span>
        </button>
      </div>
    </div>
  );
}

export default EventCard;
