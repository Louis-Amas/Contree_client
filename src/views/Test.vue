<template>
    <Historic :hands="hands"></Historic>
</template>

<script>
import Historic from "../components/Historic";

export default {
  components: {
    Historic
  },
  data() {
    return {
      hands: [
        {
          hand: [
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            },
            {
              value: "8",
              family: "hearts"
            }
          ],
          scores: {
            NS: 2130,
            WE: 1832
          },
          calls: [
            {
              position: 'NORTH',
              call: {
                family: 'hearts',
                value: '80'
              }
            },
            {
              position: 'WEST',
              call: {
                isPass: true
              }
            },
          ],
          plis: [
            {
              north: {
                family: 'hearts',
                value: '8'
              },
              west: {
                family: 'hearts',
                value: '9'
              },
              south: {
                family: 'hearts',
                value: '10'
              },
              east: {
                family: 'hearts',
                value: 'A'
              },
            }
          ]
        },
        {
          hand: [
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            },
            {
              value: "8",
              family: "spades"
            }
          ],
          scores: {
            NS: 2130,
            WE: 1832
          },
          calls: [
            {
              position: 'WEST',
              call: {
                family: 'spades',
                value: '80'
              }
            },
            {
              position: 'SOUTH',
              call: {
                isPass: true
              }
            },
          ],
          plis: [
            {
              north: {
                family: 'clovers',
                value: '8'
              },
              west: {
                family: 'clovers',
                value: '9'
              },
              south: {
                family: 'clovers',
                value: '10'
              },
              east: {
                family: 'clovers',
                value: 'A'
              },
            }
          ]
        },
      ]
    };
  }
};
</script>

<style>
</style>