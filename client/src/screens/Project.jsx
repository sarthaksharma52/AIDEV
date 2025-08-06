import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]); // Changed to Array
  const [project, setProject] = useState(location.state.project);

  console.log(location.state);

  const [user, setUser] = useState([]);

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    });
  };

  useEffect(() => {
    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <main className="h-screen w-screen flex">
        <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
          <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
            <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
              <i className="ri-add-fill mr-1"></i>
              <p>add Collaborator</p>
            </button>
            <button
              className="p-2 rounded"
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            >
              <i className="ri-group-fill"></i>
            </button>
          </header>

          <div className="conversation-area flex-grow flex flex-col">
            <div className="message-box p-1 flex-grow flex flex-col gap-1">
              <div className="max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md ">
                <small className="opacity-65 text-xs">example@gmail.com</small>
                <p className="text-sm text-black">
                  {" "}
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                <small className="opacity-65 text-xs">example@gmail.com</small>
                <p className="text-sm text-black">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <div className="inputField w-full flex">
              <input
                className="p-2 px-4 border-none outline-none bg-white flex-grow"
                type="text"
                placeholder="enter message"
              />
              <button className="px-5 bg-slate-950 text-white">
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>

          <div
            className={`sidePanel w-full h-full flex flex-col gap-2 transition-all absolute ${
              isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
            } top-0 bg-slate-50`}
          >
            <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
                <h1
                    className="font-semibold text-lg">
                        Collaborators
                </h1>
              <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users flex flex-col gap-2">
              {project.user &&
                project.user.map((user) => {
                  return (
                    <div className="user flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2">
                      <div className="aspect-square rounded-full w-8 h-8 flex items-center justify-center bg-slate-600 relative">
                        <i className="ri-user-fill text-white text-sm"></i>
                      </div>
                      <h1 className="font-semibold text-lg text-black">
                        {user.email}
                      </h1>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] w-96 max-w-full relative">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Select User</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2">
                  <i className="ri-close-fill"></i>
                </button>
              </header>
              <div className="users-list flex flex-col gap-2 max-h-96 overflow-auto mb-4">
                {user.map((user) => (
                  <div
                    key={user.id}
                    className={`user cursor-pointer hover:bg-slate-200 ${
                      Array.from(selectedUserId).indexOf(user._id) != -1
                        ? "bg-slate-200"
                        : ""
                    } p-2 flex gap-2 items-center`}
                    onClick={() => handleUserClick(user._id)}
                  >
                    <div className="aspect-square relative rounded-full w-8 h-8 flex items-center justify-center bg-slate-600">
                      <i className="ri-user-fill text-white text-sm"></i>
                    </div>
                    <h1 className="font-semibold text-lg text-black">
                      {user.email}
                    </h1>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-md"
                onClick={addCollaborators}
              >
                Add Collaborators
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Project;
