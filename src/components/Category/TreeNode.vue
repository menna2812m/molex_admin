<template>
  <div class="tree-node">
    <div
      class="tree-node-content"
      :class="{
        'has-children': hasChildren,
        expanded: isExpanded,
        'dark-tree': isDark,
      }"
    >
      <div class="d-flex align-items-center">
        <!-- Expandable area - clicking anywhere in this area expands/collapses -->
        <div
          class="expandable-area d-flex align-items-center flex-grow-1"
          @click="toggleExpanded"
          :style="{ cursor: hasChildren ? 'pointer' : 'default' }"
        >
          <!-- Expand/Collapse Icon -->
          <div class="expand-icon me-2">
            <i
              v-if="hasChildren"
              :class="
                isExpanded
                  ? 'fe fe-chevron-down text-primary'
                  : 'fe fe-chevron-right text-muted'
              "
              class="expand-chevron"
            ></i>
            <div v-else class="expand-placeholder"></div>
          </div>

          <!-- Category Image -->
          <img
            v-if="category.image"
            :src="category.image"
            class="tree-image me-3"
            alt="category image"
          />
          <div v-else class="tree-image-placeholder me-3"></div>

          <!-- Category Info -->
          <div class="category-info">
            <h6 class="mb-1 category-name">{{ category.name }}</h6>
            <small class="category-description">{{
              category.description
            }}</small>
            <div class="mt-1 category-badges">
              <span class="badge bg-info me-2"
                >المنتجات: {{ category.active_products_count }}</span
              >
              <span v-if="hasChildren" class="badge bg-secondary">
                الأقسام الفرعية: {{ category.sub_categories.length }}
              </span>
              <span v-if="hasChildren" class="expand-hint ms-2">
                <small class="text-primary">(اضغط للتوسيع)</small>
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons - clicking these won't trigger expand/collapse -->
        <div class="tree-actions" @click.stop>
          <button
            class="btn btn-info btn-sm me-1"
            @click="$emit('view', category.id)"
            v-if="perminlocal.includes('categories-show')"
            title="عرض"
          >
            <i class="si si-eye"></i>
          </button>
          <button
            class="btn btn-primary btn-sm me-1"
            @click="$emit('edit', category)"
            v-if="perminlocal.includes('categories-update')"
            title="تعديل"
          >
            <i class="fe fe-edit-2"></i>
          </button>
          <button
            class="btn btn-danger btn-sm me-1"
            v-if="perminlocal.includes('categories-destroy')"
            @click="$emit('delete', category.id, 0, category)"
            title="حذف"
          >
            <i class="fe fe-trash"></i>
          </button>
          <label
            class="custom-switch ms-2"
            v-if="perminlocal.includes('categories-toggle')"
            title="تفعيل/إلغاء تفعيل"
            @click.stop
          >
            <input
              type="checkbox"
              name="custom-switch-checkbox"
              class="custom-switch-input"
              :checked="category.is_active"
              @change="$emit('toggle', category.id)"
            />
            <span class="custom-switch-description"> </span>
            <span class="custom-switch-indicator"></span>
          </label>
        </div>
      </div>
    </div>
    <!-- Animated collapse/expand transition for subcategories -->
    <transition name="tree-collapse" mode="out-in">
      <div v-if="isExpanded && hasChildren" class="tree-children">
        <TreeNode
          v-for="child in category.sub_categories"
          :key="child.id"
          :category="child"
          :perminlocal="perminlocal"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
          @view="$emit('view', $event)"
          @toggle="$emit('toggle', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { themeMixin } from "../../mixins/themeMixin";

export default {
  mixins: [themeMixin],

  name: "TreeNode",
  props: ["category", "perminlocal"],
  emits: ["edit", "delete", "view", "toggle"],
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    hasChildren() {
      return (
        this.category.sub_categories && this.category.sub_categories.length > 0
      );
    },
  },
  methods: {
    toggleExpanded() {
      if (this.hasChildren) {
        this.isExpanded = !this.isExpanded;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-node {
  margin-bottom: 8px;
}

.tree-node-content {
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  //   background: #f8f9fa;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    border-color: var(--primary-bg-color, #fd601f);
    box-shadow: 0 2px 4px var(--primary01, rgba(253, 96, 31, 0.1));
  }

  &.has-children {
    .expandable-area {
      &:hover {
        background: var(--primary005, rgba(253, 96, 31, 0.05));
        border-radius: 6px;
      }
    }
  }

  &.expanded {
    border-color: var(--primary-bg-color, #fd601f);
    background: #fff;
  }
}

.expandable-area {
  transition: background-color 0.2s ease;
  padding: 5px;
  margin: -5px;
  border-radius: 6px;
}

.expand-icon {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.expand-chevron {
  transition: transform 0.3s ease;
  font-size: 14px;
}

.expand-placeholder {
  width: 14px;
  height: 14px;
}

.tree-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.tree-image-placeholder {
  width: 60px;
  height: 60px;
  background: #dee2e6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "📁";
    font-size: 24px;
  }
}

.category-info {
  flex-grow: 1;
}

.category-name {
  color: #2c3e50;
  font-weight: 600;
}
.dark-tree {
  &:hover {
    .category-name {
      color: #2c3e50;
    }
  }
}
.dark-tree .category-name {
  color: #fff;
}
.dark-tree.expanded .category-name {
  color: #2c3e50;
}

.category-description {
  display: block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6c757d;
}

.category-badges {
  .badge {
    font-size: 0.75rem;
  }
}

.expand-hint {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

:global(.dark-theme) .expand-hint {
  color: rgba(255, 255, 255, 0.6) !important;
}

.has-children:hover .expand-hint {
  opacity: 1;
}

.tree-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tree-children {
  margin-right: 30px;
  margin-top: 10px;
  padding-right: 20px;
  border-right: 2px dashed #dee2e6;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: -1px;
    top: -10px;
    width: 1px;
    height: 10px;
    background: #dee2e6;
  }
}

/* Transition animations */
.tree-collapse-enter-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.tree-collapse-leave-active {
  transition: all 0.3s ease-in;
  overflow: hidden;
}

.tree-collapse-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.tree-collapse-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.tree-collapse-enter-to,
.tree-collapse-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
}
.custom-switch-input:checked ~ .custom-switch-indicator {
  background: #fb99bf !important;
}

/* Responsive */
@media (max-width: 768px) {
  .tree-node-content {
    padding: 10px;
  }

  .tree-image {
    width: 40px;
    height: 40px;
  }

  .tree-image-placeholder {
    width: 40px;
    height: 40px;

    &::after {
      font-size: 16px;
    }
  }

  .tree-children {
    margin-right: 15px;
    padding-right: 10px;
  }

  .category-description {
    max-width: 200px;
  }
}
</style>
