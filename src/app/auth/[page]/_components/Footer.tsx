import './Footer.css';

function Footer() {
    return (
        <div className="bg-footer shadow-sm py-16  text-white">
            <div className="w-[80%] mx-auto ">
                <div className="flex lg:flex-row flex-col justify-between lg:gap-44 gap-20">
                    {/* Services & Community section */}
                    <div className="lg:w-1/3 w-full flex justify-between ">
                        <div>
                            <p className="font-bold mb-6">Services</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>Custom Development</li>
                                <li>Find an Accountant</li>
                                <li>ERP</li>
                                <li>Support</li>
                                <li>Upgrade</li>
                                <li>Find a Partner</li>
                                <li>Become a Partner</li>
                                <li>Products & prices</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold mb-6">Community Sources</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>Register for free</li>
                                <li>Documentation</li>
                                <li>Forum</li>
                                <li>Tutorial</li>
                                <li>Download</li>
                                <li>Github</li>
                            </ul>
                        </div>
                    </div>

                    {/* About us & My Account section */}
                    <div className="lg:w-2/3 w-full flex justify-between">
                        <div>
                            <p className="font-bold mb-6">About Us</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>Our Company</li>
                                <li>Brand Asset</li>
                                <li>Contact us</li>
                                <li>Jobs</li>
                                <li>Events</li>
                                <li>Partner services</li>
                                <li>Terms & conditions</li>
                                <li>Privacy policy</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold mb-6">My Account</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>Sign in</li>
                                <li>Register</li>
                                <li>Saved Contents</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6" />
                <p className="text-center">Copyright ©2024. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
