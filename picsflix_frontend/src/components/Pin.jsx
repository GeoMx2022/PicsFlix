import { client, urlFor } from "../client"; // eslint-disable-line
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"; // eslint-disable-line
import { v4 as uuidv4 } from "uuid"; // eslint-disable-line
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai"; // eslint-disable-line
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"; // eslint-disable-line
import { fetchUser } from "../utils/fetchUser";

export default function Pin({
  pin: { postedBy, image, _id, destination, save },
}) {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();
  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === user.googleId
  )?.length;
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
              _type: postedBy,
              _ref: user.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        })
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg"
      >
        <img
          className="rounded-lg"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 z-50 flex h-full w-full flex-col justify-between p-1 pr-2 pt-2 pb-2"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="hover:shadow-medium rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="hover:shadow-medium rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* add w-full above*/}
    </div>
  );
}
