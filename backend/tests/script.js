import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },  // 100 user trong 10 giây
        { duration: '20s', target: 500 },  // 500 user trong 20 giây
        { duration: '30s', target: 2000 }, // 2000 user trong 30 giây
        { duration: '1m', target: 5000 },  // 5000 user trong 1 phút
        { duration: '2m', target: 10000 }, // 10000 user trong 2 phút (đến khi server sập)
    ],
};

export default function () {
    // let cartRes = http.post('http://localhost:8080/api/cart/table/3d24b6c7-f989-11ef-beed-0242ac180002',
    //     JSON.stringify({ itemId: "3d31c11f-f989-11ef-beed-0242ac180002", quantity: 2 }), {
    //     headers: { 'Content-Type': 'application/json' },
    // });
    //
    // let checkoutRes = http.post('http://localhost:8080/api/order/checkout/3d24b6c7-f989-11ef-beed-0242ac180002',
    //     JSON.stringify({ userNotes: "HIII", paymentMethod: "VNPAY" }), {
    //     headers: { 'Content-Type': 'application/json' },
    // });
    let test = http.get('https://jsonplaceholder.typicode.com/posts')
    sleep(1);
}


//Get-Content script.js | docker run --rm -i grafana/k6 run -