import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTableData } from "../../store/table/tableSlice";
import { taskData } from "../../mocks/mockdata";

export const useHomepage = () => {
  /**
   * Table related
   */
  const { data, rowsPerPage, currentPage, filteredData } = useSelector(
    (state: RootState) => state.table
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTableData(taskData));
  }, [dispatch]);

  const paginatedData =
    filteredData === "" || filteredData === "All"
      ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      : data
          .filter((item) => {
            return Object.values(item).some((value) =>
              value
                ?.toString()
                .toLowerCase()
                .includes(filteredData.toLowerCase())
            );
          })
          .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const status = {
    COMPLETE: "complete",
    INPROGRESS: "in progress",
    DONE: "done",
  };

  const statusColor = {
    [status.DONE]: "bg-green-700 text-green-100",
    [status.COMPLETE]: "bg-blue-700 text-blue-100",
    [status.INPROGRESS]: "bg-yellow-700 text-yellow-100",
  };

  /**
   * Modal Related
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    paginatedData,
    statusColor,
    setIsOpen,
    isOpen,
  };
};
