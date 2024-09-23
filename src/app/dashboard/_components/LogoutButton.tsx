import { signOut } from '../_lib/actions';

function LogoutButton() {
    return (
        <form action={signOut} className="m-5">
            <button type="submit" className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    className="scale-75"
                >
                    <path
                        d="M14.2972 5.23535L12.8972 6.63535L14.4972 8.23535H6.29724V10.2354H14.4972L12.8972 11.8354L14.2972 13.2354L18.2972 9.23535L14.2972 5.23535ZM2.29724 2.23535H9.29724V0.235352H2.29724C1.19724 0.235352 0.297241 1.13535 0.297241 2.23535V16.2354C0.297241 17.3354 1.19724 18.2354 2.29724 18.2354H9.29724V16.2354H2.29724V2.23535Z"
                        fill="black"
                    />
                </svg>

                <span>Log out</span>
            </button>
        </form>
    );
}

export default LogoutButton;
