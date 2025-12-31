const NavBar = () => {
  return (
    <nav className="w-full absolute z-10 bg-gray-800 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
      <div className="text-xl font-bold tracking-wide">
        {`< MindMap />`}
      </div>
      <ul className="flex gap-6 text-sm font-medium text-gray-300">
        <li className="hover:text-white cursor-pointer">Home</li>
      </ul>
    </nav>
  );
};

export default NavBar;
