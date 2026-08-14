import { Outlet } from '@tanstack/react-router';

function DefaultLayout() {
  return (
    <>
      <nav className="-mx-1 mb-2 p-2 border-b border-gray-200 bg-gray-100">
        <a href="/" className="px-1">Portfolio</a>
        <a href="/about" className="px-1">About</a>
        <a href="/help" className="px-1">Help</a>
      </nav>
      <section className="m-2">
        <Outlet />
      </section>
    </>
  );
}

export default DefaultLayout;
