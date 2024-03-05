import React, { useState } from "react";
import "./addtask.css";
import Modal from "./Modal";
const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    desc: "",
  });

  const [data, setData] = useState([]);
  const [showActions, setShowActions] = useState({});
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // function to get the input value and set the value of task data
  const handleChange = (e) => {
    let person = { ...taskData, [e.target.name]: e.target.value };
    setTaskData(person);
  };

  // function for submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.desc) {
      setError("Title and Input is required");
    } else {
      const fakeId = Date.now();
      const newUser = { ...taskData, id: fakeId };
      const updatedUsers = [...data, newUser];
      setData(updatedUsers);
      setTaskData({ title: "", desc: "" });
      setShowActions({ ...showActions, [fakeId]: false });
      setError("");
    }
  };

  // Function to show action buttons on click
  const toggleButtons = (id) => {
    setShowActions({ ...showActions, [id]: !showActions[id] });
  };

  // function to handle edit task and save to task data
  const handleEdit = (id) => {
    const userToEdit = data.find((user) => user.id === id);
    setTaskData(userToEdit);
    const updatedUsers = data.filter((user) => user.id !== id);
    setData(updatedUsers);
    setError("");
  };

  // function for close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // function for handle delete tasks
  const handleDelete = (id) => {
    const updatedUsers = data.filter((user) => user.id !== id);
    setData(updatedUsers);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="head-text-group">
          <p className="heading-main-upper">GYIZER</p>
          <p className="heading-main-lower">TODO APP</p>
        </div>
      </div>

      <div className="input-section">
        <form className="form-area" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              className={error ? "invalid-input" : "input-title"}
              placeholder="Title..."
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
            />
            {taskData.id ? (
              <textarea
                type="text"
                className="input-desc-update"
                placeholder="Input..."
                id="desc"
                name="desc"
                value={taskData.desc}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                className={error ? "invalid-input" : "input-desc"}
                placeholder="Input..."
                id="desc"
                name="desc"
                value={taskData.desc}
                onChange={handleChange}
              />
            )}
            <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
          </div>
          <button className="submit-btn" type="submit">
            {taskData.id ? (
              <svg
                className="svg-update"
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="68"
                  height="68"
                  rx="7"
                  fill="#1B1A17"
                  stroke="#FF8303"
                  strokeWidth="2"
                />
                <path
                  d="M15.3848 30.0469H17.4287V36.623C17.4287 37.3887 17.2646 38.0335 16.9365 38.5576C16.613 39.0817 16.1641 39.4759 15.5898 39.7402C15.0202 40.0046 14.3639 40.1367 13.6211 40.1367C12.8783 40.1367 12.2174 40.0046 11.6387 39.7402C11.0645 39.4759 10.6133 39.0817 10.2852 38.5576C9.96159 38.0335 9.7998 37.3887 9.7998 36.623V30.0469H11.8506V36.623C11.8506 37.0697 11.9212 37.4342 12.0625 37.7168C12.2038 37.9993 12.4066 38.2067 12.6709 38.3389C12.9398 38.471 13.2565 38.5371 13.6211 38.5371C13.9948 38.5371 14.3115 38.471 14.5713 38.3389C14.8356 38.2067 15.0361 37.9993 15.1729 37.7168C15.3141 37.4342 15.3848 37.0697 15.3848 36.623V30.0469ZM22.9932 36.4521H20.457V34.8525H22.9932C23.3851 34.8525 23.7041 34.7887 23.9502 34.6611C24.1963 34.529 24.3763 34.3467 24.4902 34.1143C24.6042 33.8818 24.6611 33.6198 24.6611 33.3281C24.6611 33.0319 24.6042 32.7562 24.4902 32.501C24.3763 32.2458 24.1963 32.0407 23.9502 31.8857C23.7041 31.7308 23.3851 31.6533 22.9932 31.6533H21.168V40H19.1172V30.0469H22.9932C23.7725 30.0469 24.4401 30.1882 24.9961 30.4707C25.5566 30.7487 25.985 31.1338 26.2812 31.626C26.5775 32.1182 26.7256 32.681 26.7256 33.3145C26.7256 33.957 26.5775 34.513 26.2812 34.9824C25.985 35.4518 25.5566 35.8141 24.9961 36.0693C24.4401 36.3245 23.7725 36.4521 22.9932 36.4521ZM31.1963 40H29.0293L29.043 38.4004H31.1963C31.734 38.4004 32.1875 38.2796 32.5566 38.0381C32.9258 37.792 33.2038 37.4342 33.3906 36.9648C33.582 36.4954 33.6777 35.9281 33.6777 35.2627V34.7773C33.6777 34.2669 33.623 33.818 33.5137 33.4307C33.4089 33.0433 33.2516 32.7174 33.042 32.4531C32.8324 32.1888 32.5749 31.9906 32.2695 31.8584C31.9642 31.7217 31.6133 31.6533 31.2168 31.6533H28.9883V30.0469H31.2168C31.8822 30.0469 32.4906 30.1608 33.042 30.3887C33.598 30.612 34.0788 30.9333 34.4844 31.3525C34.89 31.7718 35.2021 32.2731 35.4209 32.8564C35.6442 33.4352 35.7559 34.0801 35.7559 34.791V35.2627C35.7559 35.9691 35.6442 36.6139 35.4209 37.1973C35.2021 37.7806 34.89 38.2819 34.4844 38.7012C34.0833 39.1159 33.6025 39.4372 33.042 39.665C32.486 39.8883 31.8708 40 31.1963 40ZM30.1914 30.0469V40H28.1406V30.0469H30.1914ZM41.1426 31.749L38.4355 40H36.2549L39.9531 30.0469H41.3408L41.1426 31.749ZM43.3916 40L40.6777 31.749L40.459 30.0469H41.8604L45.5791 40H43.3916ZM43.2686 36.2949V37.9014H38.0117V36.2949H43.2686ZM50.1045 30.0469V40H48.0605V30.0469H50.1045ZM53.167 30.0469V31.6533H45.0459V30.0469H53.167ZM61.0146 38.4004V40H55.7168V38.4004H61.0146ZM56.3867 30.0469V40H54.3359V30.0469H56.3867ZM60.3242 34.1006V35.6592H55.7168V34.1006H60.3242ZM61.0078 30.0469V31.6533H55.7168V30.0469H61.0078Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                className={error ? "svg-error" : "svg-btn"}
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="68"
                  height="68"
                  rx="7"
                  fill="#1B1A17"
                  stroke="#FF8303"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.5 24C36.5 23.4477 36.0523 23 35.5 23H34.5C33.9477 23 33.5 23.4477 33.5 24V32.5C33.5 33.0523 33.0523 33.5 32.5 33.5H24C23.4477 33.5 23 33.9477 23 34.5V35.5C23 36.0523 23.4477 36.5 24 36.5H32.5C33.0523 36.5 33.5 36.9477 33.5 37.5V46C33.5 46.5523 33.9477 47 34.5 47H35.5C36.0523 47 36.5 46.5523 36.5 46V37.5C36.5 36.9477 36.9477 36.5 37.5 36.5H46C46.5523 36.5 47 36.0523 47 35.5V34.5C47 33.9477 46.5523 33.5 46 33.5H37.5C36.9477 33.5 36.5 33.0523 36.5 32.5V24Z"
                  fill="#FF8303"
                />
              </svg>
            )}
          </button>
        </form>
      </div>

      <div className="task-container">
        <div className="task-section">
          {data.length === 0 ? (
            <div className="no-item-section">
              <div className="upper-line"></div>
              <div className="no-task">No tasks</div>
              <div className="bottom-line"></div>
            </div>
          ) : (
            <div className="item-sections">
              {data.map((item) => {
                return (
                  <div className="tasks" key={item.id}>
                    <div className="task-content">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-desc">
                        {item.desc.length >= 20
                          ? item.desc.slice(0, 20) + "..."
                          : item.desc}
                      </p>
                    </div>
                    {showActions[item.id] ? (
                      <div className="btn-action-grp">
                        <div
                          onClick={() => handleEdit(item.id)}
                          className="edit-btn"
                        >
                          <svg
                            width="33"
                            height="32"
                            viewBox="0 0 33 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.75"
                              y="1"
                              width="30"
                              height="30"
                              rx="5"
                              fill="#1B1A17"
                              stroke="#A35709"
                              strokeWidth="2"
                            />
                            <g clipPath="url(#clip0_1_531)">
                              <path
                                d="M11.4167 19.1111V21.3333H13.639L20.193 14.7793L17.9708 12.557L11.4167 19.1111ZM21.9116 13.0607C22.1427 12.8296 22.1427 12.4563 21.9116 12.2252L20.5249 10.8385C20.2938 10.6074 19.9205 10.6074 19.6893 10.8385L18.6049 11.923L20.8271 14.1452L21.9116 13.0607Z"
                                fill="#D9D9D9"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_531">
                                <rect
                                  width="14.2222"
                                  height="14.2222"
                                  fill="white"
                                  transform="translate(9.63892 8.88889)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div
                          onClick={() => {
                            setTaskToDelete(item.id);
                            setIsModalOpen(true);
                          }}
                          className="delete-btn"
                        >
                          <svg
                            width="33"
                            height="32"
                            viewBox="0 0 33 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.75"
                              y="1"
                              width="30"
                              height="30"
                              rx="4"
                              fill="#1B1A17"
                              stroke="#A35709"
                              strokeWidth="2"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.8407 12.121C13.5729 11.8532 13.1387 11.8532 12.8709 12.121C12.6031 12.3888 12.6031 12.8229 12.8709 13.0907L15.0731 15.2929C15.4636 15.6834 15.4636 16.3166 15.0731 16.7071L12.871 18.9093C12.6032 19.177 12.6032 19.6112 12.871 19.879C13.1388 20.1468 13.5729 20.1468 13.8407 19.879L16.0429 17.6769C16.4334 17.2864 17.0666 17.2864 17.4571 17.6769L19.6592 19.879C19.9269 20.1467 20.3611 20.1467 20.6289 19.879C20.8967 19.6112 20.8967 19.177 20.6289 18.9092L18.4268 16.7071C18.0363 16.3166 18.0363 15.6834 18.4268 15.2929L20.629 13.0908C20.8967 12.823 20.8967 12.3888 20.629 12.121C20.3612 11.8532 19.927 11.8532 19.6592 12.121L17.4571 14.3232C17.0666 14.7137 16.4334 14.7137 16.0429 14.3232L13.8407 12.121Z"
                              fill="#FF8303"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="task-actions"
                        onClick={() => toggleButtons(item.id)}
                      >
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="35"
                            height="35"
                            rx="5.5"
                            fill="#242320"
                            stroke="#A35709"
                          />
                          <path
                            d="M19.6328 14.5469V23H17.375V14.5469H19.6328ZM17.2344 12.3438C17.2344 12.0156 17.349 11.7448 17.5781 11.5312C17.8073 11.3177 18.1146 11.2109 18.5 11.2109C18.8802 11.2109 19.1849 11.3177 19.4141 11.5312C19.6484 11.7448 19.7656 12.0156 19.7656 12.3438C19.7656 12.6719 19.6484 12.9427 19.4141 13.1562C19.1849 13.3698 18.8802 13.4766 18.5 13.4766C18.1146 13.4766 17.8073 13.3698 17.5781 13.1562C17.349 12.9427 17.2344 12.6719 17.2344 12.3438Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )}
                    {isModalOpen && (
                      <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        handleDelete={() => handleDelete(taskToDelete)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
