
  const ctx = document.getElementById('myChart').getContext('2d');

  const myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4'], // x-axis (weeks)
      datasets: [
        {
          label: 'Task 1',
          data: [4, 5, 1, 7, 8],
          borderColor: 'red',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Task 2',
          data: [3, 4, 2, 5,12],
          borderColor: 'blue',
          tension: 0,
          fill: false
        },
        {
          label: 'Task 3',
          data: [2, 6, 3, 4, 5],
          borderColor: 'green',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Task 4',
          data: [5, 3, 4, 6, 2],
          borderColor: 'orange',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Task 5',
          data: [1, 4, 5, 2, 6],
          borderColor: 'purple',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Task 6',
          data: [6, 2, 4, 3, 5],
          borderColor: 'brown',
          tension: 0.2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        x: { title: { display: true, text: 'Weeks' } },
        y: { title: { display: true, text: 'Completions' }, beginAtZero: true }
      }
    }
  });
