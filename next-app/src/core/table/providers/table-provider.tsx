import { TableRowSelect } from "@/types/table-row-select";
import React, { TransitionStartFunction, useContext } from "react";

type TableContextType = {
  handleDelete?: () => void;
  dataSelected?: TableRowSelect;
  dataCount: number;
  showSearchSwitch?: boolean;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
};

const TableContext = React.createContext<TableContextType>({
  handleDelete: () => {},
  dataSelected: {} as TableRowSelect,
  dataCount: 0,
  isLoading: false,
  startTransition: () => {},
});

export const useTableContext = () => {
  return useContext(TableContext);
};

interface Props extends TableContextType {
  children: React.ReactNode;
}

const TableProvider = ({
  children,
  handleDelete,
  dataCount,
  dataSelected,
  showSearchSwitch,
  isLoading,
  startTransition,
}: Props) => {
  return (
    <TableContext.Provider
      value={{
        handleDelete,
        dataCount: dataCount || 0,
        dataSelected,
        isLoading,
        startTransition,
        showSearchSwitch,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
