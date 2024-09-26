import { searchIcon } from '../_lib/icons';

export default function SearchField() {
    return (
        <form className="relative rounded-input-radius bg-[#F0F0F0] w-full py-2 pr-3">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 scale-75">{searchIcon}</div>

            <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-transparent focus:outline-none border-none focus:border-none focus:ring-0 pl-12 w-full"
            />
        </form>
    );
}
