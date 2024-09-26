/* eslint-disable jsx-a11y/label-has-associated-control */

function AddInventoryForm() {
    return (
        <form>
            <div className="flex flex-col md:flex-row md:gap-6 justify-between">
                {/* Left Side Fields */}
                <div className="md:w-1/2">
                    {/* Name */}
                    <div className="form-control ">
                        <label className="label pb-0" htmlFor="name">
                            <span className="font-bold  ">Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter inventory name"
                            name="name"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* SKU */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="sku">
                            <span className="font-bold">SKU</span>
                        </label>
                        <input
                            type="text"
                            id="sku"
                            placeholder="Enter sku"
                            name="sku"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* Barcode */}
                    <div className="form-control ">
                        <label className="label pb-0" htmlFor="barcode">
                            <span className="font-bold  ">Barcode</span>
                        </label>
                        <input
                            type="text"
                            id="barcode"
                            placeholder="Enter barcode"
                            name="barcode"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* Unit of Measure */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="unit">
                            <span className="font-bold">Unit of Measure</span>
                        </label>
                        <select
                            id="unit"
                            name="unit"
                            className="block w-full px-1 py-[7px] rounded-md bg-white border focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        >
                            <option value="">Select Unit of Measure</option>
                            <option value="g">Grams (g)</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="lb">Pounds (lb)</option>
                            <option value="oz">Ounces (oz)</option>
                            <option value="ml">Milliliters (ml)</option>
                            <option value="L">Liters (L)</option>
                        </select>
                    </div>

                    {/* Items Description field */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="description">
                            <span className="font-bold  ">Items Description</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            placeholder="Give a short description.."
                            required
                        />
                    </div>

                    {/* Initial Quantity on Hand */}
                    <div className="form-control  ">
                        <label className="label pb-0" htmlFor="initial">
                            <span className="font-bold">Initial Quantity on Hand</span>
                        </label>
                        <input
                            type="text"
                            id="initial"
                            placeholder="Enter initial quantity"
                            name="initial"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/*  As of Date */}
                    <div className="form-control">
                        <label className="label pb-0" htmlFor="asDate">
                            <span className="font-bold">As of Date</span>
                        </label>
                        <input
                            type="text"
                            id="asDate"
                            placeholder="Enter as of date"
                            name="asDate"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* Initial Cost Per Unit */}
                    <div className="form-control  ">
                        <label className="label pb-0" htmlFor="costPerUnit">
                            <span className="font-bold ">Initial Cost Per Unit</span>
                        </label>
                        <input
                            type="text"
                            id="costPerUnit"
                            placeholder="Enter cost per unit"
                            name="costPerUnit"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* Value */}
                    <div className="form-control  ">
                        <label className="label pb-0" htmlFor="value">
                            <span className="font-bold  ">Value</span>
                        </label>
                        <input
                            type="text"
                            id="value"
                            placeholder="Enter value"
                            name="value"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>
                </div>

                {/* Right Side Fields */}
                <div className="md:w-1/2">
                    {/* Minimum Order Quantity */}
                    <div className="form-control ">
                        <label className="label pb-0" htmlFor="quantity">
                            <span className="font-bold  ">Minimum Order Quantity</span>
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    {/* Item Category */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="category">
                            <span className="font-bold">Item Category</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="block w-full px-1 py-[7px] rounded-md bg-white border focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        >
                            <option value="">Select Item Category</option>
                            <option value="sub1">Category 1</option>
                            <option value="sub2">Category 2</option>
                        </select>
                    </div>

                    {/* Item Subcategory */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="subcategory">
                            <span className="font-bold">Item Subcategory</span>
                        </label>
                        <select
                            id="subcategory"
                            name="subcategory"
                            className="block w-full px-1 py-[7px] rounded-md bg-white border focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        >
                            <option value="">Select Item Subcategory</option>
                            <option value="sub1">Subcategory 1</option>
                            <option value="sub2">Subcategory 2 </option>
                        </select>
                    </div>

                    {/* Default tax account */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="taxAccount">
                            <span className="font-bold">Default Tax Account</span>
                        </label>
                        <select
                            id="taxAccount"
                            name="taxAccount"
                            className="block w-full px-1 py-[7px] rounded-md bg-white border focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        >
                            <option value="">Select Default Tax Account</option>
                            <option value="sub1">Account 1</option>
                            <option value="sub2">Account 2 </option>
                        </select>
                    </div>

                    {/* Additional Cess */}
                    <div className="form-control">
                        <label className="label  pb-0" htmlFor="additional">
                            <span className="font-bold  ">Additional Cess</span>
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>

                    <div className="flex justify-between gap-3">
                        {/* Exclusive Tax */}
                        <div className="form-control w-1/2 ">
                            <label className="label pb-0" htmlFor="exTax">
                                <span className="font-bold">Exclusive Tax</span>
                            </label>
                            <input
                                type="text"
                                id="exTax"
                                placeholder="Enter Exclusive Tax"
                                name="exTax"
                                className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Inclusive Tax */}
                        <div className="form-control w-1/2">
                            <label className="label pb-0" htmlFor="inTax">
                                <span className="font-bold">Inclusive Tax</span>
                            </label>
                            <input
                                type="text"
                                id="inTax"
                                placeholder="Enter inclusive tax"
                                name="inTax"
                                className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>
                    </div>

                    <div className=" flex justify-between gap-3">
                        {/* Purchase Price */}
                        <div className="form-control w-1/2 ">
                            <label className="label pb-0" htmlFor="purPrice">
                                <span className="font-bold ">Purchase Price</span>
                            </label>
                            <input
                                type="text"
                                id="purPrice"
                                placeholder="Enter purchase price"
                                name="purPrice"
                                className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Sale Price */}
                        <div className="form-control w-1/2 ">
                            <label className="label pb-0" htmlFor="salePrice">
                                <span className="font-bold  ">Sale Price</span>
                            </label>
                            <input
                                type="text"
                                id="salePrice"
                                placeholder="Enter sale price"
                                name="salePrice"
                                className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Default Discount % */}
                    <div className="form-control  ">
                        <label className="label pb-0" htmlFor="discount">
                            <span className="font-bold  ">Default Discount %</span>
                        </label>
                        <input
                            type="text"
                            id="discount"
                            placeholder="Enter discount %"
                            name="discount"
                            className="block w-full px-2 py-1  bg-white border rounded-md focus:border-purple-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddInventoryForm;
