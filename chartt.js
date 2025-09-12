// import { json } from "body-parser";

const ctx = document.getElementById('myChart').getContext('2d');

fetch("http://localhost:5000/monthdata", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body:JSON.stringify({indicator:"monthData"}),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("message: ", data);
  })
  .catch((err) => console.log(err));

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
    datasets: [
      {
        label: 'Task 1',
        data: [4, 5, 1, 7, 8],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Task 2',
        data: [3, 4, 2, 5, 12],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Task 3',
        data: [2, 6, 3, 4, 5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Task 4',
        data: [5, 3, 4, 6, 2],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Task 5',
        data: [1, 4, 5, 2, 6],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Task 6',
        data: [6, 2, 4, 3, 5],
        borderColor: 'rgba(165, 42, 42, 1)',
        backgroundColor: 'rgba(165, 42, 42, 0.7)',
        tension: 0.3,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Completions',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        },
        beginAtZero: true
      }
    }
  }
});
