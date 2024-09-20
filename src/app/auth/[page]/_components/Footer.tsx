import Link from 'next/link';
import { HeaderLinks } from '../_lib/utils';
import './Footer.css';

function Footer() {
    return (
        <div className="bg-footer shadow-sm py-16  text-white">
            <div className="w-[80%] mx-auto ">
                <div className="flex lg:flex-row flex-col justify-between xl:gap-44 md:gap-32 gap-20">
                    {/* Services & Community section */}
                    <div className="xl:w-[40%] w-full flex justify-between ">
                        {/* Services */}
                        <div>
                            <p className="font-bold mb-6">Services</p>
                            <ul className="space-y-1 hover-effect">
                                <li>
                                    <span>Custom Development</span>
                                </li>
                                <li>
                                    <span>Find an Accountant</span>
                                </li>
                                <li>
                                    <span>ERP</span>
                                </li>
                                <li>
                                    <span>Support</span>
                                </li>
                                <li>
                                    <span>Upgrade</span>
                                </li>
                                <li>
                                    <span>Find a Partner</span>
                                </li>
                                <li>
                                    <span>Become a Partner</span>
                                </li>
                                <li>
                                    <span>Products & prices</span>
                                </li>
                            </ul>
                        </div>
                        {/* Community */}
                        <div>
                            <p className="font-bold mb-6">Community Sources</p>
                            <ul className="space-y-1 hover-effect">
                                <li>
                                    <span>Register for free</span>
                                </li>
                                <li>
                                    <span>Documentation</span>{' '}
                                </li>
                                <li>
                                    <span>Forum</span>{' '}
                                </li>
                                <li>
                                    <span>Tutorial</span>
                                </li>
                                <li>
                                    <span>Download</span>
                                </li>
                                <li>
                                    <span>Github</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* About us & My Account section */}
                    <div className="xl:w-[60%] w-full flex justify-between">
                        {/* About Us */}
                        <div>
                            <p className="font-bold mb-6">About Us</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>
                                    <span>Our Company</span>
                                </li>
                                <li>
                                    <span>Brand Asset</span>
                                </li>
                                <li>
                                    <span>Contact us</span>
                                </li>
                                <li>
                                    <span>Jobs</span>
                                </li>
                                <li>
                                    <span>Events</span>
                                </li>
                                <li>
                                    <span>Partner services</span>
                                </li>
                                <li>
                                    <span>Terms & conditions</span>
                                </li>
                                <li>
                                    <span>Privacy policy</span>
                                </li>
                            </ul>
                        </div>

                        {/* My Account */}
                        <div className="">
                            <p className="font-bold mb-6">My Account</p>
                            <ul className="cursor-pointer space-y-1 hover-effect">
                                <li>
                                    <Link href={HeaderLinks.LOGIN}>
                                        <span>Sign in</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/auth/signup">
                                        <span>Register</span>
                                    </Link>
                                </li>
                                <li>
                                    <span>Saved Contents</span>
                                </li>
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
