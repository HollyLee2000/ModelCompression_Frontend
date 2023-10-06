<template>
  <div class="tree-container">
    <TreeNode v-bind:level="0" v-bind:id="data.id" v-bind:label="data.label" v-bind:label_cn="data.label_cn" v-bind:children="data.children"></TreeNode>
  </div>
</template>

<script>
import TreeNode from '@/pages/algorithmIntro/TreeNode.vue';

export default {
  components: {
    TreeNode,
  },
  data() {
    return {
      data: {
        id: 1,
        label: 'Interpretability',
        label_cn: '可解释性',
        children: [
          {
            id: 2,
            label: 'Post-hoc Interpretability',
            label_cn: '事后可解释',
            children: [
              {
                id: 4,
                label: 'Local',
                label_cn: '仅局部解释',
                children: [
                  {
                    id: 8,
                    label: 'Attribution-based',
                    label_cn: '基于归因',
                    children: [
                      {
                        id: 11,
                        label: 'Gradient-based',
                        label_cn: '基于梯度归因',
                        children: [
                          {
                            id: 13,
                            label: 'LayerGradCAM',
                            // label_cn: '基于梯度归因',
                          },
                          {
                            id: 14,
                            label: 'Saliency',
                            // label_cn: '基于扰动归因',
                          },
                          {
                            id: 15,
                            label: 'Integrated Gradient',
                            // label_cn: '基于梯度归因',
                          },
                          {
                            id: 16,
                            label: 'GradientShap',
                            // label_cn: '基于扰动归因',
                          },
                          {
                            id: 17,
                            label: 'DeepLift',
                            // label_cn: '基于扰动归因',
                          },
                          {
                            id: 18,
                            label: 'Occasion',
                            // label_cn: '基于扰动归因',
                          },
                        ],
                      },
                      {
                        id: 12,
                        label: 'Distribution-based',
                        label_cn: '基于扰动归因',
                        children: [
                          {
                            id: 19,
                            label: 'Feature Ablation',
                            // label_cn: '依靠代理模型',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 5,
                label: 'Global',
                label_cn: '全局解释',
                children: [
                  {
                    id: 9,
                    label: 'Proxy',
                    label_cn: '依靠代理模型',
                    children: [
                      {
                        id: 20,
                        label: 'LIME',
                      },
                    ],
                  },
                  {
                    id: 10,
                    label: 'Concept-based',
                    label_cn: '基于概念',
                    children: [
                      {
                        id: 21,
                        label: 'Concept Activation Vectors',
                        label_cn: '(TCAV)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            label: 'Ante-hoc Modeling',
            label_cn: '可解释建模',
            children: [
              {
                id: 6,
                label: 'Local',
                label_cn: '仅局部解释',
                children: [
                  {
                    id: 22,
                    label: 'Concept-based',
                    label_cn: '基于概念',
                    children: [
                      {
                        id: 23,
                        label: 'Prototype-based',
                        label_cn: '基于原型',
                        children: [
                          {
                            id: 24,
                            label: 'ProtoPNet',
                            // label_cn: '基于原型',
                          },
                          {
                            id: 25,
                            label: 'ProtoPFormer',
                            // label_cn: '基于原型',
                          },
                          {
                            id: 26,
                            label: '黄博',
                            // label_cn: '基于原型',
                          },
                        ],
                      },
                      {
                        id: 30,
                        label: 'Schema-based',
                        label_cn: '基于图模式',
                        children: [
                          {
                            id: 31,
                            label: 'SchemaNet',
                            // label_cn: '基于原型',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 27,
                    label: 'Attention-based',
                    label_cn: '基于注意力',
                    children: [
                      {
                        id: 28,
                        label: 'Attention Mechanism',
                        // label_cn: '基于原型',
                      },
                      {
                        id: 29,
                        label: 'Constituent Attention',
                        // label_cn: '基于原型',
                      },
                    ],
                  },
                ],
              },
              {
                id: 7,
                label: 'Global',
                label_cn: '全局解释',
                children: [
                  {
                    id: 32,
                    label: 'Neural Decision Tree',
                    label_cn: '神经决策树',
                    children: [
                      {
                        id: 33,
                        label: 'ProtoTree',
                        label_cn: '原型决策树',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.tree-container {
  display: flex;
  justify-content: center;
}
</style>
