import { ShareIcon } from "../../icons/ShareIcon";

export interface CardProps {
  title: string;
  link: string;
  types: string;
}

export function Card({ title, link, types }: CardProps) {
  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4 max-w-80 border border-gray-200 min-h-58 min-w-72 ">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon size="md" />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon size="md" />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {types === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch?v=", "embed/") + "?autoplay=1"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          
          {types === "twitter" && <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>}
        </div>
      </div>
    </div>
  );
}
