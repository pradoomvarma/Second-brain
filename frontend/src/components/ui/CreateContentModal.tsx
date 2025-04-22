import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
  Twitter = "twitter",
  Youtube = "youtube",
}

// controlled component
export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [types, setTypes] = useState<ContentType>(ContentType.Youtube);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        types,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  };

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="bg-white p-4 rounded">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input ref={titleRef} placeholder="Title" />
                  <Input ref={linkRef} placeholder="Link" />
                  <div>
                    <h1>Type</h1>
                    <div className="flex justify-center gap-1 pb-2">
                      <Button
                        size="sm"
                        text="youtube"
                        variant={
                          types === ContentType.Youtube
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => setTypes(ContentType.Youtube)}
                      />
                      <Button
                        size="sm"
                        text="twitter"
                        variant={
                          types === ContentType.Twitter
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => setTypes(ContentType.Twitter)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    size="sm"
                    variant="primary"
                    text="Add"
                    onClick={addContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
