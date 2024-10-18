"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { BeatLoader, ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal from "@/components/modal/DeleteModal";
import EditConfirmationModal from "@/components/modal/EditModel";
import UpdateConfirmationModal from "@/components/modal/UpdateModal";
import { values } from "lodash";
import SuccessModal from "@/components/modal/SuccessfullModal";

function ViewUser() {
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [getUserfun, getUserResponse] = useLazyQuery(serverFetch);
  const [updateUserfun, updateUserResponse] = useLazyQuery(serverFetch);
  const [deleteUserfun, deleteUserResponse] = useLazyQuery(serverFetch);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] = useState(false);
const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false);


  const router = useRouter();
  const currentPath = useSearchParams();
  const disabled = currentPath.get("edit") === "true";

  const handleEditConfirm = () => {
    setIsEditConfirmModalOpen(false);
    router.push(`view?edit=true&id=${currentPath.get("id")}`);
  };
  

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
            is: currentPath.get("id"),
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, [currentPath.get("id")]);

  useEffect(() => {
    if (getUserResponse?.data?.getUser) {
      console.log(getUserResponse?.data?.getUser, "user");
    } else if (getUserResponse?.error) {
      toast.error("Something went wrong");
    }
  }, [getUserResponse]);

  useEffect(() => {
    if (updateUserResponse?.data?.updateUser) {
      setIsSuccessModalOpen(true); 
      // toast.success("Updated successfully");
      setTimeout(() => {
        router.push("/admin/dashboard/users");
      }, 1000);
    } else if (updateUserResponse?.error) {
      toast.error("Something went wrong");
    }
  }, [updateUserResponse]);

  useEffect(() => {
    if (deleteUserResponse?.data) {
      setTimeout(() => {
        router.push("/admin/dashboard/users");
      }, 2000);
    } else if (deleteUserResponse?.error) {
      toast.error("Something went wrong");
    }
  }, [deleteUserResponse]);

  const handleEdit = () => {
    setIsEditConfirmModalOpen(true); // Open the edit confirmation modal
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true); // Open the delete modal
  };
 
  

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    toast.success("Deleted Successfully.");
    deleteUserfun(
      `
            mutation DeleteUser($deleteUserId: ID!) {
                deleteUser(id: $deleteUserId)
              }
        `,
      {
        deleteUserId: currentPath.get("id"),
      },
      {
        cache: "no-store",
      }
    );
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
};

  return (
    <div className="flex flex-col w-[calc(100vw-260px)] gap-5 mt-16">
      <div className="shadow-md rounded-b-lg">
        <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
          <h4 className="font-medium text-[14px]">User</h4>
        </div>
        {getUserResponse?.loading ? (
          <div className="flex flex-row justify-center items-center">
            <BeatLoader color="gray" size={20} />
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center align-middle p-3">
            <Formik
              initialValues={{
                firstName: getUserResponse?.data?.getUser?.firstName || '',
                lastName: getUserResponse?.data?.getUser?.lastName || '',
                email: getUserResponse?.data?.getUser?.email || '',
                userName: getUserResponse?.data?.getUser?.userName || '',
                role: getUserResponse?.data?.getUser?.role || '',
                status: getUserResponse?.data?.getUser?.status || '',
              }}
              enableReinitialize={true}
              onSubmit={async (values) => {
                setIsUpdateConfirmModalOpen(false);
                setLoading(true);
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
                        firstName: values.firstName,
                        lastName: values.lastName,
                        status: values.status,
                        id: currentPath.get("id"),
                      },
                    },
                    {
                      cache: "no-store",
                    }
                  );
                } catch (e) {
                  console.log(e);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ values }) => (
                <Form>
                    <div className="flex flex-row gap-5 justify-center mb-8">
                    {/* Left Column */}
                    <div className="flex flex-col flex-1 gap-5">
                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          First Name
                        </label>
                        {disabled ? (
                          <Field
                            name="firstName"
                            type="text"
                            placeholder="First Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-700">{values.firstName}</span>
                        )}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          Last Name
                        </label>
                        {disabled ? (
                          <Field
                            name="lastName"
                            type="text"
                            placeholder="Last Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-700">{values.lastName}</span>
                        )}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          Email
                        </label>
                        <span className="text-gray-700">{values.email}</span>
                      </div>
                    </div>

                     {/* Right Column */}
                    <div className="flex flex-col flex-1 gap-5">
                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          User Name
                        </label>
                        <span className="text-gray-700">{values.userName}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          Role
                        </label>
                        <span className="text-gray-700">{values.role}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-24">
                          Status
                        </label>
                        {disabled ? (
                          <Field
                            as="select"
                            name="status"
                            className="border-2 bg-gray-50 p-2 rounded w-full"
                          >
                            <option value="" disabled>Select a status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="IN_ACTIVE">Inactive</option>
                          </Field>
                        ) : (
                          <span className="text-gray-700">{values.status}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col item-center gap-5 justify-center ">
                    {/* <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center">
                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          First Name
                        </label>
                        {disabled ? (
                          <Field
                            name="firstName"
                            type="text"
                            placeholder="First Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-700">{values.firstName}</span>
                        )}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          Last Name
                        </label>
                        {disabled ? (
                          <Field
                            name="lastName"
                            type="text"
                            placeholder="Last Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-700">{values.lastName}</span>
                        )}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          Email
                        </label>
                        <span className="text-gray-700">{values.email}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          User Name
                        </label>
                        <span className="text-gray-700">{values.userName}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          Role
                        </label>
                        <span className="text-gray-700">{values.role}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-semibold text-sm block w-20">
                          Status
                        </label>
                        {disabled ? (
                          <Field
                            as="select"
                            name="status"
                            className="border-2 bg-gray-50 p-2 rounded w-[233.6px]"
                          >
                            <option value="" disabled>Select a status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="IN_ACTIVE">Inactive</option>
                          </Field>
                        ) : (
                          <span className="text-gray-700">{values.status}</span>
                        )}
                      </div>
                    </div> */}

                    <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center">
                      {currentPath.get("edit") === "true" ? (
                        <button
                          type="submit"
                          className="bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[200px]"
                          onClick={() => setIsUpdateConfirmModalOpen(true)}
                        >
                          {updateUserResponse?.loading ? (
                            <div className="flex justify-center items-center">

                              
                              <ClipLoader size={20} color="#000" />
                              
                            </div>
                          ) : (
                            "Update"
                          )}
                        </button>
                      ) : (
                        <div
                          className="bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[200px] text-center cursor-pointer"
                          // onClick={() =>
                          //   router.push(`view?edit=true&id=${currentPath.get("id")}`)
                            
                          // }
                          onClick={handleEdit}
                          
                        >
                          Edit
                        </div>
                      )}

                      <div
                        className="bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer"
                        onClick={() => router.back()}
                      >
                        Cancel
                      </div>

                      <button
                        type="button"
                        className="bg-red-700 rounded-md p-2 w-[200px] text-white font-bold text-sm h-10"
                        onClick={handleDelete}
                      >
                        {deleteUserResponse?.loading ? (
                          <div className="flex justify-center items-center">
                            <ClipLoader size={20} color="#000" />
                          </div>

                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      <EditConfirmationModal
      isOpen={isEditConfirmModalOpen}
      onConfirm={handleEditConfirm}
      onCancel={() => setIsEditConfirmModalOpen(false)}
    />
    {/* <UpdateConfirmationModal
      isOpen={isUpdateConfirmModalOpen}
      onConfirm={handleEditConfirm}
      onCancel={() => setIsUpdateConfirmModalOpen(false)}
    /> */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        onClose={cancelDelete}
      />
        <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <Toaster />
    </div>
  );
}

export default ViewUser;
function setUpdateValues(values: any) {
  throw new Error("Function not implemented.");
}

