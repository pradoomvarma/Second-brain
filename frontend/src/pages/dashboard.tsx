import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "Twitter" | "Youtube" | null
  >(null);
  const { contents, refresh } = useContent();

  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  // useEffect(() => {
  //   console.log("Raw Contents:", contents);
  // }, [contents]);

  const filteredContents = selectedPlatform
    ? contents.filter(
        (item) =>
          item.types &&
          (item.types as string).toLowerCase() ===
            selectedPlatform.toLowerCase()
      )
    : contents;

  // console.log("Filtered Contents:", filteredContents);
  // console.log("Selected Platform:", selectedPlatform);

  return (
    <div>
      <Sidebar onSelect={setSelectedPlatform} />
      <div className="p-4 ml-64 min-h-screen bg-gray-200 border-2 border-gray-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.message}`;
              alert(shareUrl);
            }}
            startIcon={<ShareIcon size={"md"} />}
            variant="secondary"
            text="Share Brain"
            size="sm"
          />
          <Button
            startIcon={<PlusIcon size={"md"} />}
            variant="primary"
            onClick={() => setModalOpen(true)}
            text="Add Content"
            size="sm"
          />
        </div>

        <div className="flex gap-3 flex-wrap pt-4">
          {filteredContents.map(({ link, title, types }) => (
            <Card key={link} title={title} link={link} types={types} />
          ))}
        </div>
      </div>
    </div>
  );
}
