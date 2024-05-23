import React, { useEffect, useRef, useState } from "react";

const SubDropdown = ({
  name,
  link,
  subCategory,
  parentCategories,
}: {
  name: string;
  link: string;
  subCategory: any[];
  parentCategories: string[];
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <div className="w-full text-left flex items-center outline-none focus:outline-none">
        <a
          href={link}
          onClick={() => console.log(parentCategories.join('/'))}
          className="w-full text-left flex items-center outline-none focus:outline-none"
        >
          <span className="pr-1 flex-1">{name}</span>
        </a>
        {subCategory.length > 0 && (
          <span className="mr-auto">
            <svg
              className={`fill-current h-4 w-4 transform ${
                open ? "rotate-0" : "-rotate-90"
              } transition duration-150 ease-in-out`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={toggleDropdown}
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        )}
      </div>
      {open && (
        <ul className="bg-white border rounded-sm absolute top-4 right-0 left-28 transition duration-150 ease-in-out origin-top-left min-w-36 z-10">
          {subCategory.length > 0 &&
            subCategory.map((option: any, index: any) => (
              <React.Fragment key={index}>
                {option.subCategory.length > 0 ? (
                  <SubDropdown
                    name={option.name}
                    link={option.link}
                    subCategory={option.subCategory}
                    parentCategories={[...parentCategories, option.name]}
                  />
                ) : (
                  <li className="px-3 py-1 hover:bg-gray-100">
                    <a
                      href={option.link}
                      onClick={() =>
                        console.log([...parentCategories, option.name].join('/'))
                      }
                    >
                      {option.name}
                    </a>
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>
      )}
    </li>
  );
};

const CategoryDropdown = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="group inline-block z-10">
      <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-36">
        <span className="pr-1 font-semibold flex-1">Category</span>
        <span>
          <svg
            className={`fill-current h-4 w-4 transform ${
              open ? "-rotate-180" : ""
            } transition duration-150 ease-in-out`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={toggleDropdown}
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      {open && (
        <ul className="bg-white border rounded-sm transform scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 z-40">
          {data.map((item: any, index: any) => (
            <SubDropdown
              key={index}
              name={item.name}
              link={item.link}
              subCategory={item.subCategory}
              parentCategories={[item.name]}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
