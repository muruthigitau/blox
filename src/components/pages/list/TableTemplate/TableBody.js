import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "@/utils/DateFormat";
import handleDelete from "./DeleteHandler";
import { useModal } from "@/contexts/ModalContext";

const TableBody = ({
  data,
  updatedFields,
  selectedRows,
  handleSelectRow,
  currentPathWithoutParams,
  onEdit,
  onDeleteCallback,
  endpoint,
  setLoading,
  refresh,
}) => {
  const { openModal } = useModal();

  const renderField = (field, item) => {
    const field_id = field?.id?.toString() || field?.fieldname?.toString();
    const value = item[field_id];

    switch (field.type) {
      case "text":
        return <span>{value}</span>;
      case "number":
        return <span>{value}</span>;
      case "date":
        return <span>{new Date(value).toLocaleDateString()}</span>;
      case "boolean":
        return <span>{value ? "Yes" : "No"}</span>;
      case "options":
        return (
          <span
            className={`${
              field?.options.find((option) => option.value === value)?.style
            }`}
          >
            {value}
          </span>
        );
      case "select":
        return (
          <span
            className={`${
              field?.options.find((option) => option.value === value)?.style
            }`}
          >
            {value}
          </span>
        );
      case "status":
        return (
          <span
            className={`${
              field?.options.find((option) => option.value === value)?.style
            }`}
          >
            {value}
          </span>
        );
      case "link":
        return (
          <Link href={value}>
            <a className="text-blue-500 underline">{value}</a>
          </Link>
        );
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <tbody>
      {data?.map((item, index) => (
        <tr
          key={index}
          className={` ${index % 2 ? "bg-pink-50" : ""} hover:bg-purple-100`}
          href={`${currentPathWithoutParams}/${item.id}`}
        >
          <td className="items-start text-left">
            <input
              type="checkbox"
              checked={selectedRows.includes(item.id)}
              onChange={() => handleSelectRow(item.id)}
            />
          </td>
          {updatedFields?.map((field, fieldIndex) => {
            const field_id =
              field?.id?.toString() || field?.fieldname?.toString();

            return (
              <td
                key={fieldIndex}
                className="p-2 align-middle bg-transparent border-t shadow-transparent break-words"
              >
                {field_id === "id" ? (
                  <Link href={`${currentPathWithoutParams}/${item.id}`}>
                    <div className="text-blue-500 hover:underline">
                      {item.id}
                    </div>
                  </Link>
                ) : field.type === "image" ? (
                  <div className="flex px-2 py-1 break-words">
                    <div>
                      <img
                        src={item[field_id]}
                        className="inline-flex items-center justify-center mr-4 text-xs text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h6 className="mb-0 text-xs leading-normal">
                        {item.name}
                      </h6>
                      <p className="mb-0 text-xs leading-tight text-slate-400">
                        {item.email}
                      </p>
                    </div>
                  </div>
                ) : field.type === "linkselect" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/${field.endpoint}/${item[field_id]}`}
                    className="font-semibold leading-tight text-slate-400"
                  >
                    {item[field_id]}
                  </a>
                ) : field.type === "multiselect" ? (
                  <div className="flex flex-wrap items-center text-center gap-1">
                    {item[field_id]?.map((selectedOption) => {
                      return (
                        <span
                          key={selectedOption}
                          className="bg-purple-100 text-purple-700 py-[1px] px-[4px] rounded-md text-[9px] font-medium shadow-sm"
                        >
                          {selectedOption}
                        </span>
                      );
                    })}
                  </div>
                ) : field.type === "selec" ? (
                  <span
                    className={`font-semibold leading-tight bg-gradient-to-tl px-2.5 text-xs rounded-1.8 py-1.4 inline-block text-center align-baseline font-bold uppercase leading-none text-white ${
                      field?.options?.find(
                        (option) => option.value === item[field_id]
                      )?.style
                    }`}
                  >
                    {item[field_id]}
                  </span>
                ) : (
                  <span>{item[field_id]}</span>
                )}
              </td>
            );
          })}
          {item?.modified && (
            <td className="p-2 align-middle bg-transparent border-t flex items-center text-xs shadow-transparent">
              <span className="inline-block w-1 h-1 rounded-full bg-orange-600 mr-1"></span>
              {timeAgo(new Date(item.modified))}
            </td>
          )}
          <td className="align-middle bg-transparent border-t shadow-transparent">
            <Link href={`${currentPathWithoutParams}/${item.id}`}>
              <div
                onClick={() => onEdit(item)}
                className="text-xs font-semibold leading-tight text-slate-400 cursor-pointer"
              >
                <FontAwesomeIcon icon={faEdit} />
                {/* <EditButton /> */}
              </div>
            </Link>
          </td>
          <td className="align-middle bg-transparent border-t shadow-transparent">
            <div className="text-xs w-4 h-4 font-semibold leading-tight text-slate-400 cursor-pointer">
              <button
                className="text-red-500"
                onClick={() =>
                  handleDelete({
                    id: item.id,
                    endpoint,
                    openModal,
                    setLoading,
                    refresh,
                  })
                }
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
