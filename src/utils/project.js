import React from "react";

const Project = ({ id, title, type, project, year, manageModal, index }) => {
  return (
    <tr
      className="border-b border-black group md:table-row flex flex-col md:flex-row cursor-pointer"
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
    >
      <td className="py-0 md:py-6 lg:py-14 pr-6 flex-1 md:table-cell mt-2">
        <span className="md:hidden font-semibold"></span>{title}
      </td>
      <td className="py-0 md:py-6 lg:py-14 pr-6 flex-1 md:table-cell">
        <span className="md:hidden font-semibold"></span>{type}
      </td>
      <td className="hidden md:table-cell py-0 md:py-6 lg:py-14 pr-6 flex-1">
        <span className="font-semibold"></span>{project}
      </td>
      {/* Change year color on hover */}
      <td className="hidden md:table-cell py-0 md:py-6 lg:py-14 pr-6 flex-none text-gray-500 group-hover:text-black transition-colors duration-300">
        <span className="font-semibold"></span>{year}
      </td>
      <td className="md:hidden py-0 flex justify-between items-center px-0 md:px-6 mb-2">
        <div>
          <span className="font-semibold"></span>{project}
        </div>
        {/* Change year color on hover */}
        <div className="group-hover:text-black text-gray-500 transition-colors duration-300">
          <span className="font-semibold"></span>{year}
        </div>
      </td>
    </tr>
  );
};

export default Project;