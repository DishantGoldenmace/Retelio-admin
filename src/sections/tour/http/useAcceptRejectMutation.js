import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance, { endpoints } from "src/utils/axios";

async function acceptReject(input) {
  return axiosInstance.put(`${endpoints.vendor.acceptReject}/${input.id}`, input);
}

const useAcceptRejectMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptReject,

    onSuccess: async (res, input) => {
      toast.success(res?.data?.message || "Action successful");

  
      queryClient.invalidateQueries({
        queryKey: [endpoints.vendor.list], 
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export default useAcceptRejectMutation;
