
import { useQuery } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../../utils/axios";


async function fetchData(actionType) {
  const { data } = await axiosInstance.get(`${endpoints.vendor.list}/${actionType}`);
  return data.data;
}

export const useGetAllVendorList = (actionType) => {
  return useQuery({
    queryKey: [endpoints.vendor.list],
    queryFn: ()=>fetchData(actionType),
    refetchOnWindowFocus: false,
  });
};
