# Backend Developer Challenge – IP Location API

Your task is to implement a REST API using TypeScript that resolves a user's IP to a location by looking it up in a dataset.

---

## 🧠 Objective

Implement an endpoint `/ip/location` that accepts a query parameter called `ip` and returns the corresponding geographic location if found in the dataset.

---

## 📄 Dataset

You will receive a CSV file with **2,979,950 rows**. Each row describes an IP range and its corresponding location.

- The file **does not** include column names.
- The IP ranges are given using **numeric representations of IPs**.
- Each row is structured as:

| Column | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| 1      | Lower IP ID (inclusive)                                           |
| 2      | Upper IP ID (inclusive)                                           |
| 3      | Country Code                                                      |
| 4      | Country Name                                                      |
| 5      | State/Region                                                      |
| 6      | City                                                              |
| 7–10   | You may ignore these (latitude, longitude, postal code, timezone) |

---

## 🔢 IP to ID Conversion

> The provided CSV dataset is using an numeric ID to identify the IP

To convert a standard IPv4 address to an IP ID, use this formula:

```ts
function ipToId(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}
````

---

## 🌐 API Specification

### GET `/ip/location`

**Query Parameter**:

- `ip` (string): The IPv4 address to look up.


**Behavior**:

- Convert the IP to its corresponding IP ID using the `ipToId` function.

- Search for a row where:

    ```
    lower_ip_id <= ip_id <= upper_ip_id
    ```

- If no match is found, return:

```http
    Status: 404 Not Found
```

- If a match is found, return:

    ```json
    Status: 200 OK
    {
      "country": "Country Name",
      "countryCode": "Country Code",
      "city": "City"
    }
    ```


---

## 🧪 Load Testing with K6

Include a file `test.js` with the following content to validate the endpoint:

```js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const ip = '1.0.1.1'; // replace with valid test IPs as needed
  const res = http.get(`http://localhost:3000/ip/location?ip=${ip}`);

  check(res, {
    'status is 200 or 404': (r) => r.status === 200 || r.status === 404,
  });
}
```

Run with:

```bash
k6 run test.js
```

---

## 🧪 Starter API Example (Always returns 404)

Here’s a simple TypeScript/Restify starter that always returns 404:

> You can use any other Framework to construct the API.

### `index.ts`

```ts
import restify from 'restify';

const server = restify.createServer();

server.get('/ip/location', (req, res, next) => {
  res.send(404);
  next();
});

server.listen(3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
```

To run:

```bash
npm install restify
ts-node index.ts
```

---

## 🏗️ Evaluation Criteria

### You will be evaluated on:

- **Correctness**: The API behaves according to the spec.
- **Architecture**: Clarity and organization of your code.
- **Code Quality**: Readability, modularity, maintainability.
- **Performance considerations**: Not required, but a plus if addressed.

### Not Required:

- Minimal usage of libraries.
- Minimal IO lock.
- Instructions to deploy this API on a Cloud Service.

---

## 📦 Submission

Please include:

- Your codebase in a zip file without the folder `node_modules`
- Clear instructions to install dependencies and run the server and tests.
- Your architectural decisions are in a `README.md` or similar file.
