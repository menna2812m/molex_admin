// mixins/FormErrorMixin.js
export const FormErrorMixin = {
  data() {
    return {
      fieldErrors: {},
    };
  },

  methods: {
    // ✅ مسح جميع الأخطاء
    clearAllErrors() {
      this.fieldErrors = {};
    },

    // ✅ مسح خطأ حقل معين
    clearFieldError(fieldName) {
      if (this.fieldErrors[fieldName]) {
        delete this.fieldErrors[fieldName];
      }
      // مسح الأخطاء العامة أيضاً (name.ar -> name)
      const baseFieldName = fieldName.split(".")[0];
      if (this.fieldErrors[baseFieldName]) {
        delete this.fieldErrors[baseFieldName];
      }

      // إجبار Vue على إعادة الرندر (Vue 3 compatible)
      this.$forceUpdate && this.$forceUpdate();
    },

    // ✅ تعيين أخطاء من استجابة API
    setFieldErrors(errors) {
      this.fieldErrors = errors || {};
    },

    // ✅ فحص وجود خطأ لحقل معين
    hasFieldError(fieldName) {
      const specificError = this.fieldErrors[fieldName];
      const generalError = this.fieldErrors[fieldName.split(".")[0]];
      return !!(specificError || generalError);
    },

    // ✅ الحصول على رسالة الخطأ لحقل معين
    getFieldError(fieldName) {
      const specificError = this.fieldErrors[fieldName];
      const generalError = this.fieldErrors[fieldName.split(".")[0]];

      if (specificError && specificError[0]) {
        return specificError[0];
      }
      if (generalError && generalError[0]) {
        return generalError[0];
      }
      return null;
    },

    // ✅ معالجة أخطاء الاستجابة العامة
    handleApiErrors(error, toast) {
      // استخراج أخطاء الحقول من مسارات مختلفة محتملة
      const errors = error?.response?.data?.errors || error?.data?.errors || {};

      if (Object.keys(errors).length > 0) {
        this.setFieldErrors(errors);
      }

      // عرض أول رسالة خطأ في التوست
      const errorMessages = Object.values(errors)
        .flat()
        .filter((msg) => typeof msg === "string");

      if (errorMessages.length > 0) {
        toast.error(errorMessages[0], {
          position: "top-right",
          timeout: 5000,
        });
      } else {
        // رسالة خطأ عامة إذا لم توجد أخطاء محددة
        const generalMessage =
          error?.response?.data?.message ||
          error?.data?.message ||
          "حدث خطأ ما، يرجى المحاولة مرة أخرى.";

        toast.error(generalMessage, {
          position: "top-right",
          timeout: 5000,
        });
      }
    },

    // ✅ التحقق من صحة النموذج محلياً (اختياري)
    validateForm(rules = {}) {
      const errors = {};

      Object.keys(rules).forEach((fieldName) => {
        const rule = rules[fieldName];
        const value = this.getNestedValue(this.formData || {}, fieldName);

        // التحقق من الحقول المطلوبة
        if (rule.required && (!value || value.toString().trim() === "")) {
          errors[fieldName] = [`${rule.label || fieldName} مطلوب`];
        }

        // التحقق من الحد الأدنى للطول
        if (rule.minLength && value && value.length < rule.minLength) {
          errors[fieldName] = [
            `${rule.label || fieldName} يجب أن يكون على الأقل ${
              rule.minLength
            } أحرف`,
          ];
        }

        // التحقق من البريد الإلكتروني
        if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
          errors[fieldName] = [
            `${rule.label || fieldName} يجب أن يكون بريد إلكتروني صحيح`,
          ];
        }

        // التحقق من حجم الملف
        if (rule.maxSize && value && value.size) {
          const maxSizeInBytes = rule.maxSize * 1024; // KB to bytes
          if (value.size > maxSizeInBytes) {
            errors[fieldName] = [
              `${rule.label || fieldName} يجب أن يكون أقل من ${
                rule.maxSize
              } KB`,
            ];
          }
        }
      });

      if (Object.keys(errors).length > 0) {
        this.setFieldErrors(errors);
        return false;
      }

      return true;
    },

    // ✅ الحصول على قيمة متداخلة من الكائن
    getNestedValue(obj, path) {
      return path.split(".").reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
      }, obj);
    },
  },

  // ✅ إنشاء watchers تلقائياً للحقول المحددة
  created() {
    if (this.watchedFields && Array.isArray(this.watchedFields)) {
      this.watchedFields.forEach((fieldPath) => {
        // استخراج اسم الحقل من المسار (مثل formData.name.ar -> name.ar)
        const fieldName = fieldPath.replace(/^formData\./, "");

        this.$watch(fieldPath, () => {
          this.clearFieldError(fieldName);
        });
      });
    }
  },
};
