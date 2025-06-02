const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TableTransaction() {
  return (
     <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow h-[300px] overflow-auto">
          <table className="min-w-[600px] w-full text-sm text-left">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-2">ID Faktur</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Keterangan</th>
                <th className="px-4 py-2">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((inv) => (
                <tr key={inv.invoice}>
                  <td className="px-4 py-2 font-medium">{inv.invoice}</td>
                  <td className="px-4 py-2">{inv.paymentStatus}</td>
                  <td className="px-4 py-2">{inv.paymentMethod}</td>
                  <td className="px-4 py-2">{inv.totalAmount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-2" colSpan={3}>Total</td>
                <td className="px-4 py-2">Rp2.500.000</td>
              </tr>
            </tfoot>
          </table>
        </div>
  )
}
