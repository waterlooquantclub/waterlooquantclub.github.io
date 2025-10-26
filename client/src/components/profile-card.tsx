import {
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Linkedin,
  Mail,
} from "lucide-react";
import { useEffect } from "react";

type ProfileProps = {
  fullname: string;
  role: string;
  bio: string;
  website?: string;
  linkedin?: string;
  email?: string;
  image?: string;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

function IconLink({
  icon: Icon,
  ...props
}: {
  icon: React.ElementType;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className="p-2 hover:text-[#9770D6] text-[#EAD0ED]">
      <Icon className="h-7 w-7" />
    </a>
  );
}

function ProfileCard({
  fullname,
  role,
  website,
  linkedin,
  email,
  bio,
  image,
  onClose,
  onPrev,
  onNext,
}: ProfileProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
      }
      if (e.key === "ArrowLeft") {
        onPrev?.();
      }
      if (e.key === "ArrowRight") {
        onNext?.();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      <div
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
          w-[600px] max-w-[92vw] max-h-[85vh] overflow-auto
          rounded-3xl border border-[#818181]
          bg-linear-to-t to-black/70 from-[#603067B3]
          backdrop-blur-md
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          p-12
        "
        role="dialog"
        aria-modal="true"
        aria-label={`${fullname} profile`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 p-2 hover:text-[#9770D6]"
        >
          <X className="h-8 w-8" />
        </button>

        <button
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 p-2 hover:text-[#9770D6]"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:text-[#9770D6]"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="flex justify-center">
          <div className="h-28 w-28 rounded-full border border-[#818181] grid place-items-center overflow-hidden shadow-[0_0_6px_#ffffffBF]">
            <img
              src={image}
              alt="Member image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">{fullname}</h2>
          <p className="text-xl sm:text-2xl mt-2 text-white ">{role}</p>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4">
          {website && (
            <IconLink
              href={website}
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              icon={Globe}
            />
          )}
          {linkedin && (
            <IconLink
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              icon={Linkedin}
            />
          )}
          {email && (
            <IconLink href={`mailto:${email}`} aria-label="Email" icon={Mail} />
          )}
        </div>

        <div className="mt-4 mx-auto text-center">
          <p className="text-white">{bio}</p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
