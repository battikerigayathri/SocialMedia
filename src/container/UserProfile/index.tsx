"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaEdit, FaKey, FaSpinner } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { BeatLoader } from "react-spinners";
import { RiCloseLine } from "react-icons/ri";
// import { FaUser } from "react-icons/fa";
import { Console, log } from "console";
import { deleteCookie, getCookie } from "cookies-next";
import { divide } from "lodash";
import Image from "next/image";

const UserProfile = ({ userId, onClose }: any) => {
  const [getUserfun, getUserResponse] = useLazyQuery(serverFetch);
  const [updateUserfun, updateUserResponse] = useLazyQuery(serverFetch);
  const [getUserProfile, getUserProfileResponse] = useLazyQuery(serverFetch);
  const [changePassword, changePasswordResponse] = useLazyQuery(serverFetch);
  const [token, setToken] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [passwordPopup, setpasswordPopup] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [logo, setLogo] = useState<any>();
  const [imgSrc, setImgSrc] = useState();
  const [loading, setloading] = useState(false);
  const router = useRouter();



  const defaultUserIcon = <FaUser />; 

  useEffect(() => {
    setToken(getCookie("tokenkey") ? true : false);
    const userId = getCookie("UserId");
    if (userId) {
      setUser(userId);
      console.log("User ID:", userId);
    }
  }, []);
  useEffect(() => {
    getUserfun(
      `
        query GetUser($where: whereUserInput!) {
            getUser(where: $where) {
                id
                firstName
                lastName
                userName
                email
                role
                status
                createdOn
                updatedOn
            }
        }
      `,
      {
        where: {
          id: {
            is: userId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, [userId]);

  useEffect(() => {
    getUserProfile(
      `
       query GetUser($where: whereUserInput!) {
  getUser(where: $where) {
    profile {
      id
      name
      type
      path
      createdOn
      updatedOn
    }
    id
  }
}
      `,
      {
        where: {
          id: {
            is: userId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, [userId]);

  useEffect(() => {
    if (getUserProfileResponse?.error) {
      toast.error("Failed to fetch user data");
    }
    console.log(getUserProfileResponse?.data, "user profile");
    if (getUserResponse) {
      setImgSrc(getUserProfileResponse?.data?.getUser?.profile?.path);
    }
  }, [getUserProfileResponse]);
  useEffect(() => {
    if (getUserResponse?.error) {
      toast.error("Failed to fetch user data");
    }
  }, [getUserResponse]);

  useEffect(() => {
    if (updateUserResponse?.data?.updateUser) {
      toast.success("Profile updated successfully");
      setTimeout(() => {
        onClose();
        router.push("/admin/dashboard");
      }, 1000);
    } else if (updateUserResponse?.error) {
      toast.error("Failed to update profile");
    }
  }, [updateUserResponse, router]);

  useEffect(() => {
    if (changePasswordResponse?.data?.setNewPassword) {
      toast.success("Password changed successfully");
      setTimeout(() => {
        setpasswordPopup(false);
      }, 1000);
      console.log("password updated successfully");
    } else if (changePasswordResponse?.error) {
      toast.error("Failed to update password");
    }
  }, [changePasswordResponse]);

  const updateFile = async () => {
    if (!logo) {
      toast.error("No file selected");
      return;
    }

    try {
      setloading(true);
      const formData = new FormData();
      formData.append("file", logo);
      formData.append("userId", userId);
      formData.append("name", "ramesh");
      formData.append("description", "test description");

      const response = await fetch("/api/profile-upload", {
        method: "POST",
        body: formData,
      });

      if (response.statusText === "OK") {
        toast.success("Logo updated");
        router.refresh();
      }
    } catch (e: any) {
      toast.error("Failed to update logo");
      console.log(e?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-opacity-50 flex justify-center items-center z-10 absolute top-14 right-10 rounded-2xl p-1.5">
      {getUserResponse.loading ? (
        <div className="flex flex-row justify-center items-center">
          <BeatLoader color="gray" size={15} />
        </div>
      ) : (
        <div>
          {updateUserResponse.loading || changePasswordResponse.loading ? (
            <div className="flex flex-row justify-center items-center">
              <BeatLoader color="gray" size={15} />
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h2 className="text-2xl mb-2 font-bold">Profile</h2>

                <div
                  className="rounded-md font-bold text-3xl text-black cursor-pointer"
                  onClick={onClose}
                >
                  <RiCloseLine />
                </div>
              </div>
              <div className="relative w-24 h-24 mx-auto">
                {/* <div>
                  <Image
                    src={imgSrc || ""}
                    unoptimized
                    alt="logo"
                    height={50}
                    width={200}
                    className="w-auto h-[54px] rounded-xl"
                  />
                </div> */}
                <div className="relative w-24 h-16 mx-auto justify-center">
  {imgSrc ? (
    <Image
      src={imgSrc || ""}
      unoptimized
      alt="Profile Image"
      height={50}
      width={200}
      className="w-[50px] h-[50px]  rounded-md items-center  justify-center" 
    />
  ) : (
    <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center">
      <FaUser size={30} className="text-gray-500" />
    </div>
  )}
</div>

                <div className="flex items-center">
                  <label
                    htmlFor="file-upload"
                    className="block px-3 py-2 text-sm font-medium text-white rounded-md cursor-pointer focus:outline-none bg-gray-500 mb-2"
                  >
                    Upload
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const validTypes = ["image/png", "image/jpeg", "image/webp"];
                        if (validTypes.includes(file.type)) {
                          setLogo(file);
                        } else {
                          toast.error("Invalid file type. Please upload a PNG, JPG, or WEBP image.");
                        }
                      }
                    }}
                  />
                </div>
                {/* {logo && (
                  <button
                    type="button"
                    className="p-2 bg-blue-400"
                    onClick={() => updateFile()}
                  >
                    Update
                  </button>



                )} */}
                 <button
      type="button"
      className="p-2 bg-blue-400 flex items-center justify-center"
      onClick={() => updateFile()}
      disabled={loading}
    >
      {loading ? (
        <FaSpinner className="animate-spin text-white" size={20} />
      ) : (
        'Update'
      )}
    </button>
              </div>

              <Formik
                initialValues={{
                  firstName: getUserResponse?.data?.getUser?.firstName || "",
                  lastName: getUserResponse?.data?.getUser?.lastName || "",
                  email: getUserResponse?.data?.getUser?.email || "",
                  userName: getUserResponse?.data?.getUser?.userName || "",
                  role: getUserResponse?.data?.getUser?.role || "user",
                  status: getUserResponse?.data?.getUser?.status || "ACTIVE",
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                  if (passwordPopup) {
                    try {
                      console.log(
                        "Password",
                        values.email,
                        values.confirmPassword,
                        values.currentPassword
                      );
                      changePassword(
                        `
                    mutation SetNewPassword($email: String!, $password: String!, $previousPassword: String!) {
                      setNewPassword(email: $email, password: $password, previousPassword: $previousPassword) {
                        msg
                        id
                      }
                    }
                  `,
                        {
                          email: values?.email,
                          password: values?.confirmPassword,
                          previousPassword: values?.currentPassword,
                        },
                        {
                          cache: "no-store",
                        }
                      );
                      console.log("ended");
                    } catch (e) {
                      toast.error("Failed to update password");
                    }
                  } else if (isEditMode) {
                    try {
                      updateUserfun(
                        `
                    mutation UpdateUser($input: updateUserInput!) {
                        updateUser(input: $input) {
                            id
                            firstName
                            lastName
                            userName
                            email
                            role
                            status
                            createdOn
                            updatedOn
                        }
                    }
                  `,
                        {
                          input: {
                            firstName: values?.firstName,
                            lastName: values?.lastName,
                            status: values?.status,
                            id: userId,
                          },
                        },
                        {
                          cache: "no-store",
                        }
                      );
                    } catch (e) {
                      toast.error("Failed to update profile");
                    }
                  } else {
                    setEditMode(true);
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <div className="p-6">
                      {!passwordPopup ? (
                        <div>
                          <Field name="firstName">
                            {({ field }: any) => (
                              <div className="flex gap-2 items-center">
                                <label className="font-bold text-sm block w-20">
                                  First Name:
                                </label>
                                {isEditMode ? (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="First Name"
                                    className="border-2 p-2 rounded bg-yellow-50 border-yellow-500 "
                                  />
                                ) : (
                                  <span className="font-light">
                                    {field.value}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                          <Field name="lastName">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  Last Name:
                                </label>
                                {isEditMode ? (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Last Name"
                                    className="border-2 p-2 rounded bg-yellow-50 border-yellow-500"
                                  />
                                ) : (
                                  <span className="font-light">
                                    {field.value}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                          <Field name="email">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  Email:
                                </label>
                                <span>{field.value}</span>
                              </div>
                            )}
                          </Field>
                          <Field name="userName">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  User Name:
                                </label>
                                <span className="font-light">
                                  {field.value}
                                </span>
                              </div>
                            )}
                          </Field>
                          <Field name="role">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  Role :
                                </label>
                                <span className="font-light">
                                  {field.value}
                                </span>
                              </div>
                            )}
                          </Field>
                          <Field name="status">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  Status:
                                </label>
                                <span className="font-light">
                                  {field.value}
                                </span>
                              </div>
                            )}
                          </Field>
                        </div>
                      ) : (
                        <div>
                          <Field name="email">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-20">
                                  Email:
                                </label>
                                <span className="font-light">
                                  {field.value}
                                </span>
                              </div>
                            )}
                          </Field>
                          <Field name="currentPassword">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-40">
                                  Current Password:
                                </label>
                                <input
                                  {...field}
                                  type="password"
                                  placeholder="Current Password"
                                  className="border-2 p-2 rounded bg-yellow-50 border-yellow-500"
                                />
                              </div>
                            )}
                          </Field>
                          <Field name="newPassword">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-40">
                                  New Password:
                                </label>
                                <input
                                  {...field}
                                  type="password"
                                  placeholder="New Password"
                                  className="border-2 p-2 rounded bg-yellow-50 border-yellow-500"
                                />
                              </div>
                            )}
                          </Field>
                          <Field name="confirmPassword">
                            {({ field }: any) => (
                              <div className="flex flex-row gap-2 items-center">
                                <label className="font-semibold text-sm block w-40">
                                  Confirm Password:
                                </label>
                                <input
                                  {...field}
                                  type="password"
                                  placeholder="Confirm Password"
                                  className="border-2 p-2 rounded bg-yellow-50 border-yellow-500"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      )}
                      <div className="flex gap-2 mt-6 items-center">
                        <div>
                          <button
                            type="submit"
                            className={`rounded-md p-2 text-white font-bold text-sm h-10 w-[100px] text-center cursor-pointer ${
                              isEditMode || passwordPopup
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-950 hover:bg-blue-700"
                            }`}
                          >
                            {isEditMode || passwordPopup ? "Update" : "Edit"}
                          </button>
                        </div>

                        {!isEditMode && !passwordPopup && (
                          <div
                            className="bg-gray-500 flex flex-row justify-center rounded-md p-2 w-[150px] text-white font-bold text-sm h-10 cursor-pointer hover:bg-gray-700"
                            onClick={() => {
                              setpasswordPopup(true);
                            }}
                          >
                            Change Password
                          </div>
                        )}

                        {!isEditMode && !passwordPopup && (
                          <div
                            className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-red-600 cursor-pointer bg-red-400 text-white rounded-md"
                            onClick={() => {
                              deleteCookie("tokenkey");
                              deleteCookie("UserId");
                              router.push("/login");
                            }}
                          >
                            Logout
                          </div>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              <Toaster />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
